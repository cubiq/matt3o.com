---
title: "Concepts3D Athena 2 Review"
pubDate: 2025-11-28
category: "Reviews"
tags: ["3D print"]
poster: "/concept3d-athena-2-review/images/Athena2.jpg"
---
This won't be an easy review to write. The [Athena II](https://www.concepts3d.ca/products/athenaii) is probably the best SLA 3D printer money can buy... For all the wrong reasons.

I wanted to buy the Athena 1 when it was released a few years back, but it was the first product by a new company so I gave them time to mature. When the Athena 2 was announced surely they had time to iron out all the issues, right? Well, let's start from the beginning.

I often hear youtubers calling the Athena 2 an "Open Source" printer. **This is simply not true.** The firmware is mostly closed source and I'm not aware of any hardware documentation or files being released. It's an "open resin" printer, meaning that you can use any 405nm UV resin you want and they don't lock you into a proprietary ecosystem. They are also very transparent and open to share information about the hardware and development process, but you can't build your own Athena 2 from scratch. As an open source evangelist it is very frustrating to see this kind of misinformation being spread, but that has nothing to do with Concepts3D per-se and more with the lazy "influencers".

I was in the first batch of pre-orders, so I received the printer early. The Athena 2 is a sturdy, well built chunk of steel and aluminum. It's heavy and solid, with an impressive stability on the Z axis. It's clear though that they tried to cut a few corners here and there, some non-functional parts are 3D printed and don't align perfectly with the rest of the chassis. Honestly I don't really mind, it adds a bit of *maker's charm* to the machine, but I understand that it may raise some eyebrows for a $1300 product.

When I bought it, it was possible to choose between the 12K and 16K screen options. I went for the 12K because I always felt the 16K was somewhat of a gimmick and possibly it was introduced too early just to justify a resolution increase, and I was right. More about that later.

12K is a great resolution and also allows more UV light to pass through, resulting in possibly faster prints and better quality. Nowadays the 16K is the only option available as apparently the 12K screens are no longer produced.

Other important features are a heated vat (that I consider a must-have) and the mystical force sensor that should give real time data to adjust the printing parameters on the fly and improve quality, success rate and speed.

## A bumpy start

The first couple of weeks were rough. The plate was incredibly hard to level and it turned out it was a combination of issues: 1) the "pro arm" had some engineering flaws; 2) the vat was creating a vacuum seal with the screen resulting in an excessive pull force; 3) the firmware had a few bugs that prevented the Z axis to zero properly. On top of that my unit had a faulty SSD and the MCU board (a Raspberry Pi 5 module) was quite overheating.

It took almost a month to first of all understand what all the issues were, and then to get them fixed. During the whole process Concepts3D support has always been very responsive and helpful, at any time I could have sent the printer back for repair but I preferred to try and fix things on my own with their guidance. The high repairability of the Athena 2 is its first great strength and something you rarely see in this market. So even if the initial experience was bumpy, it outlined the great support and the ease of serviceability of the printer.

![Fixing the Athena 2... with added custom fan](/concept3d-athena-2-review/images/A2-interior.jpg)

Even less lucky were the people that opted for the 16K screen. Simply put, the Athena firmware didn't support 16K resolution at launch. They fixed the issue quickly, but it makes you wonder if they even ever tested their machine before shipping.

Anyway, after all the reports from the first batch they stopped shipping Athenas and worked hard to solve the hardware problems. As far as I understand they restarted fulfillment recently, so from now on you guys should get a much more polished product... You should thank the early adopters... You are welcome :P

## The 16K screen and Antialiasing

A quick digression about the 16K screen debacle and why it matters when buying a C3D product.

**Every single 16K printer on the market today comes with a 3-bit controller.** This means that the screen can only display 8 levels of gray, of which only 4-5 are usable for printing. This was imposed by Chitu (manufacturer of the control boards of most Chinese SLA printers) to keep costs down and simplify the design. The CPU on these boards simply can't handle a higher bit depth at 16K resolution, but the Athena 2 is based on a Raspeberry Pi 5 that is more than capable. To my knowledge Concepts3D is the first company that is going to implement a 16K 8-bit controller.

The new controller is still in beta test and the initial machines shipped with the 3-bit version, but in the future it will be possible to upgrade.

The advantage of having an 8-bit controller is that you can implement a higher resolution antialiasing. Antialiasing is a technique that smooths the edges of each layer by varying the exposure of the pixels on the border. With more gray levels you can achieve a smoother transition, resulting in less visible layer lines. It's important to remember that the effect greatly depends on the resin, some are more receptive to antialiasing than others and some may even show artifacts with it enabled.

Below are two pictures of the same model printed without and with antialiasing.

![Anti-Aliasing off](/concept3d-athena-2-review/images/AA_off.jpg) ![Anti-Aliasing on](/concept3d-athena-2-review/images/AA_on.jpg)

## Firmware and Software

The Athena 2 runs on a custom firmware based on [NanoDLP](https://www.nano3dtech.com/). I believe I've built my first SLA printer about 8 years ago now, I was using NanoDLP back then and seeing how little it has evolved is a bit disappointing.

You can connect to the printer from your browser and upload models and start prints directly from there. You don't need to install any software or move files with USB sticks, which is great. The problem is that the integrated slicer is slow and buggy. You can use [NanoSupport](https://www.nano3dtech.com/nanosupport-download/) to slice models on your computer, that improves speed drastically, but still it failed to slice way too often especially with complex hollowed models.

To improve reliability I ended up using [Chitubox](https://www.chitubox.com/) (or [PrusaSlicer](https://github.com/prusa3d/PrusaSlicer/releases)) for slicing, exporting the files as `.zip` and converting them to NanoDLP with [UVTools](https://github.com/sn4k3/UVtools). It's an extra step but at least it's fail proof.

The main problem is that as of today the Athena 2 firmware takes advantage of possibly 30% of its potential. They are constantly working on improvements and they seem to listen to users suggestions, but after a couple of months I ended up disabling the force sensor altogether and developing my own optimized profiles.

NanoDLP profiles can be "programmed" with custom Javascript, GCODE and even Klipper macros. This is an incredibly powerful feature that allows to tweak every aspect of the printing process. At each layer NanoDLP sends statistics to the profile that can adapt dynamically. For example if there's a huge area to cure, we can slow down the lift speed because we assume the force will be higher. Inversely, if the layer is small we can speed up resulting in faster print times especially the last 100-ish layers.

This is not done automatically by the firmware at the moment, but I developed my own system that I'm refining constantly. I also re-integrated a 2-stage lift/retract movement that the Athena doesn't currently support.

Unfortunately there's no way to communicate with the force sensor, so for now I'm just ignoring it and relying on layer by layer data. That granted me a huge improvement in print quality, optimizing also print time.

On their Discord server (that I encourage you to join) they are currently talking about ways to improve the profiles, but with the added data from the force sensor. I'm sure they will eventually release a more refined firmware but as of now it's still a work in progress.

## Print Quality

The good news is that the build quality of the Athena 2 is top notch. The Z axis is solid and grants incredible layer consistency, if the resin is properly configured.

![Elegoo ABS like](/concept3d-athena-2-review/images/test_print_1.jpg) ![Siraya tech](/concept3d-athena-2-review/images/test_print_2.jpg) ![Ameralabs TGM](/concept3d-athena-2-review/images/test_print_3.jpg)

![3DJake high resolution](/concept3d-athena-2-review/images/test_print_4.jpg) ![3DJake high resolution](/concept3d-athena-2-review/images/test_print_5.jpg) ![Sunlu ABS like](/concept3d-athena-2-review/images/test_print_6.jpg)

The suction force in certain scenarios is still quite high, that can be improved with better resins and tweaking the profiles, but I'm still not completely satisfied by the dimensional accuracy... Given I'm a relentless perfectionist.

Concepts3D has recently teased an upcoming "Air Release" system that should drastically reduce the suction force by allowing air to enter between the screen and the film during the lift phase. This is the image that they shared:

![Air release tease](/concept3d-athena-2-review/images/air-release.jpg)

Apparently the cone was printed on a tiny support and honestly it looks amazing! Again this will be available as an upgrade for existing Athena 2 owners.

## Conclusion

Concepts3D is probably the only underdog SLA printer company in the consumer market. There are many not-Chinese realities that target professionals, but very few try to compete directly with Elegoo or Anycubic. I have to give Nico and Pascal from C3D credit for that, and I think we should cut them some slack when they are encountering a few bumps on the road.

Talking to them on Discord I understand that they are trying to appeal a more professional audience, but at the moment the product is not polished enough for the task. It is nonetheless a great printer for tinkerers and enthusiasts. To my knowledge it's the only SLA printer that you can easily repair and upgrade on your own, not to mention the firmware that allows deep customization.

A while back they also teased an "Athena Resin Database" that should allow plug-and-play resin profiles but it is still in [very early stages of development](https://proteus.concepts3d.eu/) and the few profiles that are loaded don't actually match the exposure times that I measured. So, again, we have to wait a little longer.

If you are okay with wasting some resin and time to dial in the settings, I can absolutely recommend the Athena 2. If you are a professional or you are looking for a "print and forget" experience, I'd suggest to wait a little longer and check back in a few months when the firmware will be more mature. As of now without deep tinkering with the profiles as I did, it doesn't print better or faster than cheaper alternatives. It pains me to say that because I really want Concepts3D to succeed, to me the Athena 2 is the only printer worth buying today, but I don't want you to have the wrong expectations. Maybe I'll post an update in a few months to document the progress.
