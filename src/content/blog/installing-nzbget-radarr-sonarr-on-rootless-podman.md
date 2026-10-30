---
title: "Installing NZBGet, Radarr, and Sonarr on Rootless Podman and Quadlet"
pubDate: 2026-06-03
category: "DIY"
tags: ["linux"]
poster: "/installing-nzbget-radarr-sonarr-on-rootless-podman/podman.jpg"
---
Time for some geeking out. I'm one of those fools who like to run their own local server with not cloud shenanigans. I've been running an Ubuntu server for a while with a bunch of individually installed services, but I wanted to try something more compartmentalized, easier to maintain and update. The obvious choice would have been Docker, but I like to make my life complicated so I installed Fedora with the plan of using **Podman with Quadlet**.

This post is mostly a note-to-self so I have some documentation of the process next time I need to reinstall everything.

I assume you already have Fedora (44 in my case) and podman installed. The first thing to do is to create the `*.containers` directory in your home for quadlet to use:

```bash
mkdir -p ~/.config/containers/systemd
```

nzbget, radarr and sonarr all need to talk in the same network, so we need to create a custom network for them. This is something I haven't seen mentioned in other tutorials, but without this step I wasn't able to get them to communicate properly.

In the directory we just created, add a file called `~/.config/containers/systemd/arr.network` with the following content:

```ini
[Network]
NetworkName=arr_net
```

If you need to make any changes to the network configuration (for example to set a custom subnet or DNS), you can edit the `arr.network` file but remember that the **virtual network won't be updated** unless you either restart podman or remove and recreate the network with `podman network rm arr_net` and `systemctl --user start arr_net-network.service`. I wasted a lot of time trying to figure out why the containers couldn't talk to each other and it was because restarting the network without deleting it doesn't apply the changes.

Next we need the volumes for the containers. I have a big storage drive mounted at `/mnt/storage` where I keep all my media and related files, so I created the following directories:

```bash
mkdir -p /mnt/storage/media/{nzbget,radarr,sonarr,downloads,Movies,TV}
```

Remember that we are creating a rootless setup, so we need to make sure that the user running the containers is the same as the owner of the files and directories; in my case is `matteo`.

## NZBGet

Now we start configuring the actual containers. First NZBGet. Create a file called `~/.config/containers/systemd/nzbget.container` with the following content:

```ini
[Unit]
Description=NZBGet
After=podman-user-wait-network-online.service
Wants=podman-user-wait-network-online.service

[Container]
Image=ghcr.io/nzbgetcom/nzbget:latest
ContainerName=nzbget

# Environment variables
Environment=PUID=0
Environment=PGID=0
Environment=TZ=Europe/Rome

# Ports and Volumes
Network=arr.network
PublishPort=6789:6789
Volume=/mnt/storage/media/nzbget:/config:Z
Volume=/mnt/storage/media/downloads:/downloads:z

# This enables automatic updates
AutoUpdate=registry

[Service]
Restart=always
TimeoutStartSec=900

[Install]
WantedBy=default.target
```

The file is pretty basic, the only thing to note is that we are using the custom network we created before (`Network=arr.network`)and that we are mounting the volumes with `:Z` and `:z` options to make sure SELinux doesn't get in the way. It's important to note the difference between uppercase and lowercase `Z` here, the former will allow only the container to access the volume, while the latter will allow other processes on the host to access it as well. Of course we want the `downloads` volume to be accessible from radarr and sonarr, so we use `:z` (lowercase) for that one.

Also note that we are setting `PUID` and `PGID` to `0`. In a perfect world we would want to set these to the actual user and group IDs (eg: 1000), and then use `podman unshare chown` to change the ownership of the directory `/mnt/storage/media`. That totally works but doing so I can't access the files and directories directly from the host without using `sudo`. Setting `PUID` and `PGID` to `0` might not be ideal but it seems to work. Let me know if you have a better solution for this. Remember that setting them to `0` in a non-root environment doesn't give the container root privileges, so it shouldn't be a security issue.

Let's give nzbget a try before moving on to the other containers. Run the following command to start it:

```bash
systemctl --user daemon-reload
systemctl --user start nzbget
```

If everything went well you should be able to access the nzbget web interface at `http://[server-ip]:6789` and log in with the default credentials (`admin:tegbzn6789`). At this point you should ensure that nzbget is using the correct paths, and of course you'll need a news server.

Under **settings > security** make sure to set **ControlIP** to `0.0.0.0`, and resolve any other issues outlined in the **messages** section.

## Lingering

We also want to start nzbget automatically on boot. By default, rootless `systemd --user` sessions only start when a user logs in and tear down upon logout. To force the system to initialize your specific user session at boot, we need "lingering" enabled. Run this command with administrative privileges:

```bash
sudo loginctl enable-linger $USER
```

## Radarr and Sonarr

Okay, time to move on to radarr. Create a file called `~/.config/containers/systemd/radarr.container` with the following content:

```ini
[Unit]
Description=Radarr
After=podman-user-wait-network-online.service
Wants=podman-user-wait-network-online.service

[Container]
Image=lscr.io/linuxserver/radarr:latest 
ContainerName=radarr

Environment=PUID=0
Environment=PGID=0
Environment=TZ=Europe/Rome

Network=arr.network
PublishPort=7878:7878
Volume=/mnt/storage/media/radarr:/config:Z
Volume=/mnt/storage/media/downloads:/downloads:z
Volume=/mnt/storage/media/Movies:/movies:z

AutoUpdate=registry

[Service]
Restart=always
TimeoutStartSec=900

[Install]
WantedBy=default.target
```

The configuration is pretty much the same as nzbget, we just need to change the image, the container name, the ports and the volumes. The important thing is that we are using the same custom network (`Network=arr.network`) so that radarr can talk to nzbget. Same as before note the use of `:Z` and `:z` for the volumes.

And finally sonarr. Create a file called `~/.config/containers/systemd/sonarr.container` with the following content:

```ini
[Unit]
Description=Sonarr
After=podman-user-wait-network-online.service
Wants=podman-user-wait-network-online.service

[Container]
Image=ghcr.io/linuxserver/sonarr:latest 
ContainerName=sonarr

Environment=PUID=0
Environment=PGID=0
Environment=TZ=Europe/Rome

Network=arr.network
PublishPort=8989:8989  
Volume=/mnt/storage/media/sonarr:/config:Z
Volume=/mnt/storage/media/downloads:/downloads:z
Volume=/mnt/storage/media/TV:/tv:z

AutoUpdate=registry

[Service]
Restart=always
TimeoutStartSec=900

[Install]
WantedBy=default.target
```

We can now start both radarr and sonarr with the same commands we used for nzbget:

```bash
systemctl --user daemon-reload
systemctl --user start radarr
systemctl --user start sonarr
```
If everything went well you should be able to access the web interfaces at `http://[server-ip]:7878` for radarr and `http://[server-ip]:8989` for sonarr. You can then configure them to use the correct paths, and of course set up the indexers and the connection to nzbget.

When creating a new Download Client in radarr and sonarr, make sure to **use the actual IP address of the server** (eg: `192.168.1.2`). *localhost* or *127.0.0.1* **won't work**.

Congratulations, you now have nzbget, radarr and sonarr running in rootless podman containers that start on boot. To have it also update automatically we need one more step.

## Automatic Updates

Thanks to the `AutoUpdate=registry`, all containers are already configured to update automatically when a new image is available on the registry, but we need to enable the `podman-auto-update.timer` systemd timer to make it work considering my server is always on.

Run the following command:

```bash
systemctl --user enable --now podman-auto-update.timer
```

That's it, now your containers will be automatically updated when a new image is available. You can check the status of the timer with:

```bash
systemctl --user status podman-auto-update.timer
```

It's not technically recommended to have automatic updates, basically if it works, don't touch it. But I like to live on the edge and I can always roll back to a previous image if something breaks.

## Bonus: Reverse Proxy with nginx

Everything seems to be working, but I want to access the services with nice URLs like `http://nzbget.cool.domain` instead of `http://192.168.1.2:6789`. To do that I set up a reverse proxy with nginx. It's pretty straightforward, but --again-- SELinux can be a bit of a pain.

I'm already running a full authoritative DNS server with `unbound` so it's easy for me to redirect custom domains to my server IP, but you can achieve the same result in multiple ways (like editing your `hosts` file or using a different DNS server or even PI-Hole).

For unbound I added the following lines to my configuration:

```conf
...
local-zone: "cool.domain." static
local-data: "nzbget.cool.domain. IN A 192.168.1.2"
local-data: "radarr.cool.domain. IN A 192.168.1.2"
local-data: "sonarr.cool.domain. IN A 192.168.1.2"
...
local-data-ptr: "192.168.1.2 nzbget.cool.domain."
local-data-ptr: "192.168.1.2 radarr.cool.domain."
local-data-ptr: "192.168.1.2 sonarr.cool.domain."
...
```

Then I installed and enabled nginx with:
```
sudo dnf install nginx
sudo systemctl --now enable nginx
```

We also need to relax SELinux to allow nginx to make outbound connections. Run the following command:

```bash
sudo setsebool -P httpd_can_network_connect 1
```

Since we are at it I also created a self signed SSL certificate for the domain so I can access the services over HTTPS. To do that I ran the following command:

```bash
openssl req -x509 -newkey rsa:4096 -sha512 -days 3650 -noenc -keyout cool.domain.key -out cool.domain.crt -subj "/CN=cool.domain" -addext "subjectAltName=DNS:cool.domain,DNS:*.cool.domain,IP:192.168.1.2"
```

Of course change `cool.domain` (can be anything, even made up) with your actual domain and `192.168.1.2` with your server IP. That will generate a certificate valid for 10 years, copy the .crt and .key files to a sensible location (eg: `/etc/nginx/certs/`) and then inform SELinux about the new files with:

```bash
sudo restorecon -Rv /etc/nginx/certs
```
Finally we can create the nginx configuration for the reverse proxy. Create a file called `proxy.conf` in `/etc/nginx/conf.d/` with the following content:

```nginx
server {
    listen 80;
    server_name nzbget.cool.domain;
    return 301 https://$host$request_uri;
}

server {
    listen       443 ssl;
    listen       [::]:443 ssl;
    http2        on;
    server_name  nzbget.cool.domain;

    ssl_certificate "/etc/nginx/certs/cool.domain.crt";
    ssl_certificate_key "/etc/nginx/certs/cool.domain.key";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers PROFILE=SYSTEM;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:6789;

        # Pass correct headers to NZBGet
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Allow large file uploads via the web UI if necessary
        client_max_body_size 100M;
    }
}
```

Repeat the same for radarr and sonarr, just changing the `server_name` and the port in `proxy_pass`. Reload nginx and you should be able to access the services with the nice URLs we set up.

## Conclusion

I'm not sure if this is the best way to set everything up but seems to be working fine for me. I especially like that I don't need to change the permission on the shared volumes and my main user still has read/write access to the media files. I also have an NFS partition mounted using the same user and group so everything is integrated seamlessly.

If you have any suggestions or improvements drop me a [message](/about/) or find me on [Mastodon](https://mastodon.social/@cubiq) or [Discord](https://discord.gg/matt3o).
