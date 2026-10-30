---
title: "First steps in 3D printing with an Original Prusa i3 MK II"
pubDate: 2016-11-12
category: "Reviews"
tags: ["3D print"]
poster: "/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/DSC00308.jpg"
---
I've been skeptical about consumer grade 3d printers for long time. They were expensive, slow, required a lot of maintenance and quality was less than optimal. Things are moving rapidly, though and we’ve reached such a nice sweet spot between quality and price that I couldn’t simply resist the temptation.

First of all I had to understand if I wanted an FDM (fused deposition modeling) or SLA (stereolithography) printer. Without going too much into it, SLA generally produces higher definition prints but it is also more expensive to start with and maintain. You can find very cheap FDM instead and while the print quality is not as good, it is exceptional for quick prototyping. So FDM it is.

Only few months ago Prusa released the second generation of what is probably the most famous filament 3d printer in the DIY realm: the not-so-originally named **[Prusa i3 MK 2](http://shop.prusa3d.com/en/17-3d-printers)**. It comes in kit or fully assembled, I was convinced to get an assembled one but it wasn’t available at the time so I went for the kit because _“it can’t be that difficult, right?!”_

## Why the Prusa?

![Original Prusa i3 MK 2](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/DSC00307.jpg)

Multiple reasons brought me to get a Prusa instead of the countless alternatives.

**First of all price.** I’m a complete 3d print noob, I jumped into this world without a clear understanding of what were the difficulties I would have encountered. As such I didn’t want to invest too much and the €739 entry point for the Prusa looked very appealing also considering the very good reviews I've seen.

**Great firmware.** The firmware running the MK2 does an exceptional work at compensating for the small build errors. Even if the printer is not optimally assembled, the firmware tries to correct the imperfections on all axis and guarantees a straight and leveled print in every scenario. On top of that it's is open source!

**Auto-leveling heatbed.** A heated bed optimizes adhesion and it is very important for wide material compatibility. ABS for example tends to warp and detach from the base if the bed is not heated. The bed is also auto-leveling with 9 calibration points, so if the base is not perfectly leveled the firmware takes care of the micro anomalies.

**Great extruder.** The Prusa includes an original E3D V6 hotend which is the real pulsing heart of a 3D printer. A good hotend/extruder combination grants not only reliable printing but also elevated speed. The hotend comes with a 0.4mm nozzle, which is great for your average printing needs but you can replace the nozzle with a 0.25mm one for super high definition or with a 0.5 or 0.6mm if you need quick and dirty prototypes. Replacing the nozzle is not a plug-n-play operation, though, so in reality you are not going to exchange the head so often.

These are the main factors that sold me a Prusa MK2 but there’s more. Speed is not great but definitely in the top tier for a consumer product on this price range; build area is decent (25x21x20cm) even though I would have liked few centimeters more on the Z axis; layer height resolution is an impressive 50 microns; and last but not least the printer comes with 1kg PLA filament.

## To the build!

Building the MK2 is not for the faint of heart. I had no prior experience with 3d printers but I know a little CNC routers so at end I managed to get it assembled. If you don’t consider yourself particularly crafty I’d suggest to avoid the kit.

It took me 5-6 hours I believe to have the beast ready and another couple of hours to make adjustments and calibration.

The worst part is mounting the base perfectly square. Some kind of jig to help mounting and screwing the base straight would have been greatly appreciated. In all honesty the structure looks a little amateurish, with bolts and zip ties everywhere but at the end it’s the result that counts and the prints have been great so far.

![Squaring the Prusa](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/DSC00299.jpg)

Another crucial part in the assembling is the probe on the Y axis. Calibrating the distance to the print bed is one of the most important and time consuming part. The probe is used to check the distance of the nozzle to the base and to compensate the position irregularities of the heatbed.

If the probe is just a little too low the head will scratch the heatbed, if it’s too high the calibration will fail. I needed a couple of tries to make it perfect and even when correctly positioned and calibrated you still need some tinkering with the Z distance to make sure the print head is just at the right distance with the bed. Take your time, don’t rush it or you’ll risk to damage your precious.

## Print quality

As you know by now, I’m no 3d printer guru, I can’t really make a real comparison with other products, but **this thing produces some darn good prints**!

I was surprised how good my very first print was, I was expecting hours of painful per-model calibration but you can basically throw anything to the Prusa and it won’t never disappoint.

As you get more and more into 3d printing you understand the importance of a great slicer. The slicer is the software that converts a 3d model into a language the printer can understand. It literally slices the model into layers in the order the printer will deposit them, but there’s so much more about it and fully understanding all the options can make the difference between a total fiasco and a great print.

The Prusa comes with [Slic3r](http://slic3r.org/) profiles and as far as I understand that is the only officially supported software. Without entering the “slicer war” (yeah, of course there’s an argument about that too on the internet) the main alternatives are the open source [Cura](https://github.com/Ultimaker/Cura/) developed by [Ultimaker](https://ultimaker.com/) and the paid and closed [Simplify3D](https://www.simplify3d.com/). People swear by Simplify3D but the profiles I’ve found for the MK2 are not perfect and optimizing them would require a deeper understanding of how the machine works.

While it is true that there’s no absolute best slicer and depending on the 3d model you should use one or another software, I find myself comfortable with Cura and I'm using it 90% of the times.

Below one of the first prints I've made. It's PLA printed at 100 microns layer distance.

![First print with the Prusa MK2](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/DSC00380.jpg)

Of course I wanted to check the feasibility of more complex models, the following needed quite some post processing (ie: sanding and priming), but it turned out beautifully. There are about 30 hours of print time there, most of them at 100 microns but some at 50.

![](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/lightsaber-1.jpg) ![](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/images/lightsaber-2.jpg)

## Room for improvement

I’m extremely satisfied by my sub $1000 3D printer and I’m already using it with success for prototypes and final products alike. That doesn’t mean that it is perfect. Very little and relatively inexpensive updates would make this printer even better.

My biggest complaints are: **bearings** and **filament cooling**.

The ball bearings that come with the Prusa are medium/low quality, I understand they are a bit hit-and-miss, some have no issues with them but in my case one of them was so bad that the heatbed was wobbling around. The best update I made to the printer is bearings replacement. Now it is not only sturdier but it is also quieter!

The other issue is with the cooling system. Some filaments need to cool down as quickly as possible once extruded and the Prusa has only one fan. It is generally enough but there are situations where you’d want better cooling. In particular when you are dealing with overhang parts and the plastic needs to cool down very quickly or it falls down. This happened to me quite often, the easiest solution is to place a PC fan on the back of the piece (since the on board fan blows from the front) but it would have been nice to have a more integrated solution.

Everything else is pretty much spot on. The filament holding system could be better probably, also I would like to see less zip ties, but all in all I don’t regret purchasing the MK2 and I would definitely recommend it!

If you buy the kit head to the [Prusa forum](http://shop.prusa3d.com/forum/original-prusa-i3-mk2-f23) before assembling, you’ll find some tips that will spare you a lot of pain. Remember to get replacement bearings and buy some thread locking glue; all the nuts tend to loosen up after a bit.

Next project: 3d printed keyboard case :)
