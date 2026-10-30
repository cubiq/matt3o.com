---
title: "Peopoly Moai, an honest review"
pubDate: 2018-11-04
category: "Reviews"
tags: ["3D print"]
poster: "/peopoly-moai-an-honest-review/images/moai.jpg"
---
I've always looked with awe at the whole 3d printing phenomenon. I believe something clicked in my mind with the Star Trek replicator and 3d printers are the closest thing to it we have nowadays.

I waited long enough to get an original Prusa MK2 ([also reviewed here](/first-steps-in-3d-printing-with-an-original-prusa-i3-mk-ii/)) and a little more than a year ago I finally bit the bullet and jumped into UV resin printing.

The beast to beat at the time was the Formlab Form2 but the price to get it and especially to maintain it is too steep for an amateur like myself. To the rescue the [Peopoly Moai](https://peopoly.net/), a Laser SLA that is not only affordable but also comes with a variety of very wallet friendly resins.

The Moai at the end of 2017 wasn't ready yet so I emailed Peopoly asking for information and within seconds I received a reply from Mark (the founder) who promised to ship within a few weeks.

## First impressions

Two weeks later I had a Fedex at the door with a huge box and a laser SLA ready to be assembled. The kit is a very fun and easy build. If you have even just a little craftsmanship I would recommend taking the kit over the assembled version some retailers sell. Assembling the machine helps you understand how it really works and keeps you grounded with the expectations. Remember at the end this is still an "enthusiast" product, not really intended for the pro market even though more and more companies are relying on it.

![](/peopoly-moai-an-honest-review/images/moai-kit.jpg)

Few hours later I printed my first 3D model: the test ring that comes with the Moai. The result was astonishing. Coming from a filament printer I couldn't believe my eyes. The quality I was able to reach without any kind of calibration was incredible.

Happiness though quickly faded and left room to frustration.

![The ring test, my very first Moai print](/peopoly-moai-an-honest-review/images/moai-ring.jpg)

## Temperature

If you think filament printing is complicated, resin printing is an order of magnitude worse. Especially when you want to reach extremely high quality.

First thing I wasn't aware of is the importance of temperature. UV Resin is usually meant to be used at 25°C, but that's really the suggested bare minimum. Consider I received my Moai in winter and in-house temperature was around 21-22°C.

The Moai doesn't come with a heater and that's a huge problem. Now you can [buy it as an add-on](https://peopoly.net/collections/frontpage/products/peopoly-heater-for-moai-moai-200) --even though often out of stock-- but it's such a crucial aspect that it should really come integrated. Most of Moai resins needs a temperature of at least 27°C to reach peak performance and some up to 30°C (notably the hi-temp resin).

It took me some time to get it, but ultimately I built myself a heater and quality and --most importantly-- reliability improved drastically.

![Custom built heater](/peopoly-moai-an-honest-review/images/moai-heater.jpg)

## Software

Second problem was the software... or lack of (the situation is better now, keep reading).

Very important factor in resin printing is the support structure. You can't just print a model out of your 3D software, you need to prepare it so it doesn't fall apart during printing.

While it's generally easy to do for filament and software like Slic3r already does a great job at it, resin is a completely different feast.

The Moai didn't come with a software to create supports and it requires quite some expertise to master the art of manual supports creation (because automatic supports suck). The best option at the time was **B9Creator**, a program created by the good guys at B9Creations for their 3D printers but they are kind enough to let you use it freely.

Support positioning and sizing is something that impacts deeply on the print quality and success rate and you need time and dozens of failed prints to understand how it works.

Fortunately few days ago Peopoly released [Asura](http://wiki.peopoly.net/doku.php?id=moai:asura), the official software to prepare a model for printing. It's a step in the right direction and the software has great potential, but it's far for complete at the time of this writing. It still misses some very important features and some polishing (it crashes quite a bit), but at least new comers have something to start with and are not completely left in the blind.

And here comes the slicer.

Preparing the model is just the first step. The next one is to slice it and create the toolpaths that the laser will follow to recreate your hopefully perfect replica.

Moai uses [Cura](https://github.com/Ultimaker/Cura/) as a slicer. It's a great open source software hugely optimized for filament printers and hence not really the best for laser galvo.

I spent months and liters of resin to pin point various glitches I was having with my prints and it turned out to be an issue with the toolpath creation. Fortunately Cura is open source and I was able to compile myself a custom version with various optimizations (that are now part of the main Cura repository since v3.5).

Asura includes CuraEngine inside of it (which is the actual slicer while Cura is just the GUI) so slicing is still performed in a way that is not optimized for the Moai. Don't get me wrong, you generally get great results but it's when you push the machine to the limit that you start noticing anomalies that are introduced by an inadequate engine.

It's hard to say when the toolpath generation limits (and rounding errors) will actually hit you. The issues are generally more noticeable on geometric shapes with large sloped sides, but also on organic shapes with smooth surface and small indented or raised details. Honestly, it's not too bad and on average you get very good results but still it's frustrating to hit a wall and not being able to do anything about it.

![A 3d model I designed to check slicer issues. The surface should be completely flat on the top right and bottom left, but it has visible issues instead.](/peopoly-moai-an-honest-review/images/moai-glitches.jpg)

During the whole process I was in contact with Mark who is an incredibly nice guy. He is aware of all the problems and he is willing to fix them one by one. His passion and dedication to the project is really contagious and even if the Moai is not perfect you know that they are actively working on it to make it better. This is not a knock-off Chinese product released to the market just to cash in and forgot soon after. They are actively working on it and they do listen to users' feedback.

## Distortion

Another problem is peripheral distortion. The Moai has a laser beam positioned in the middle of the print area. The farther you go from the center the worse the distortion. Recent firmware and Asura try to compensate the distortion and today the situation is pretty good, but just few months ago printing the same model in the center and on a corner led to two dimensionally different models.  

Since Firmware v1.16 (now we are at 1.18) Peopoly introduced a distortion compensation algorithm directly into the machine core. That alone helped a lot to the point of being a non-issue for me. I normally print organic models or anyway I don't need to-the-micron precision, so v1.16 was already good enough but Asura (Peopoly own preparation software) added some more software post-processing. From initial reports it seems Asura bring distortion to 1%.

## Build plate leveling

Another source of frustration is the build plate leveling, AKA _Nuts with the screw nuts_.

The build plate needs to be perfectly parallel to the vat. Few microns skew and the model won't stick to the plate and --alas!-- wasted time and resin.

The leveling process is designed to make you feel miserable. It involves removing the side panels, running a test print which consists in 4 small pillars positioned on the 4 corners, measuring them, tightening or loosing 4 nuts by a vaguely random amount. At that point you can re-print the pillars and repeat until all 4 are of the same height with approximately a 0.05mm tolerance. Take your time, it will be fun (#NOT).

Good news is that once done you don't have to do it never again (well… mostly), but still it is clear the Moai is for tinkerers.

To renew the feeling that early adopters were beta testers (and I'm totally fine with that), Peopoly recently released an [Easy-to-Level Build plate](https://peopoly.net/collections/frontpage/products/easy-to-level-build-plate-for-moai), or "How it should have been in the first place"-plate. I don't know if it is the default plate that comes with the Moai now, but do yourself a favor and grab it.

## Post processing

This is not a how-to-3d-print tutorial, but it's worth mentioning that each and every item coming out of the Moai needs post processing --like any other resin printer.

First of all you need a good bath in isopropyl alcohol and then a 5-10 minutes exposure to an UV lamp. Many say that a sun bath is enough… while that might be true I don't suggest that. Invest in a good LED UV lamp for optimal results.

The whole post processing is very simple and becomes natural after a while but it's surely messy and a bit smelly. So you need a good clean wide working space and remember to always wear disposable gloves.

## Resins and vats

A great selling point of the Moai are the resins. They are incredibly good for the price and require relatively low laser power preserving your precious vats.

Vats are consumables; while they can be refurbished they still need to be changed on a regular basis. Personally I printed for months before needing to dispose my first vat, but quality gets progressively worse as the vat ages. I noticed that not only the PDMS layer deteriorates but the acrylic sheet under it also gets "scratched" by the laser so restoring an old vat is not just a matter of pouring a new PDMS layer (which is not easy to come by BTW).

The problem with peopoly resins is that they are really formulated for around 50µm layer height. No reason to push the resolution higher than 40µm since the resin really can't reach that much detail. For that reason I tried some third party resins with alternating degree of success. Unfortunately the best resins I've tried are very aggressive on the vat, to the point that I could print only one model per vat.

To the rescue once again Peopoly released a FEP vat, incredibly durable and inexpensive to restore. It was a welcoming upgrade that came with its dose of frustration. My workflow after a year was more or less established but with a FEP vat everything had to be recalibrated. Support structure has to be created differently. Speed has to be tuned again. But with a FEP vat the sky is the limit. You can use basically any resin on the market without fearing for your precious and fragile PDMS.

My suggestion is to still use the PDMS vat as it's very easy use and forgiving, but if you want to step up your game definitely get the FEP vat.

Despite the new vat though I still couldn't get the quality I was wishing for and that is when I had my epiphany and finally put the Moai in the right perspective.

## The right perspective

The Moai is a great machine with an impressive build area (130x130mm) for the resolution it delivers.

The cost of the hardware is relatively low considering the competition (a Form 2 is $3500 for example) but most importantly the cost-per-print is very contained using the $75/liter Peopoly resins. Compare that to the Formlabs $180/liter or the Junction3D $250/liter and you easily forgive the few hiccups.

![](/peopoly-moai-an-honest-review/images/resin-printer-comparison.jpg)

It's a printer I don't regret buying by any means but it's important to understand that:

1. It's not a print-and-forget experience, you need to dedicate yourself fully to it until you really understand how it works. The process takes time and a little craftsmanship. If you lack either this is probably not your best printer for you.
2. It is not the highest resolution you can get, it's probably not on par with the Form2 (at least not with Peopoly resins) but it's fast and delivers great resolution for small-but-not-minuscule sized items.

Businesses has started buying it attracted by the very competitive pricing but as of today the Moai is more of a hobbist/tinkerer/enthusiast/maker printer. I believe this situation has created some problems with the growth of the one-man-show Peopoly that is transitioning from a kickstarter to a more consolidated reality.

## Print quality

Enough blabbing. What's the print quality of this thing?

The Moai offers a layer height (Z resolution) from 5 to 100 microns and a laser spot size (XY resolution) of 70-micron.

Reality is that with standard resins you can only print between 40 and 60 microns, going lower than that only grants you longer print time but not better quality.

For bigger models you may expect a very good dose of layering that will require some post processing, namely sanding, patience and elbow grease. If the surface is very intricate that might not be possible.

![](/peopoly-moai-an-honest-review/images/DSC01036.jpg) ![](/peopoly-moai-an-honest-review/images/moai-quality-1.jpg)

![](/peopoly-moai-an-honest-review/images/moai-quality-2.jpg) ![](/peopoly-moai-an-honest-review/images/moai-quality-3.jpg)
    

The Moai is great for organic/natural small-to-medium sized shapes without an insane amount of tiny details. Please understand that this is a high definition printer, but it's not able to catch the minuscule features of a 3d model and it definitely doesn't shine in geometric shapes reproduction. I had the opportunity to test a Form 2 a Solus and a high end SLA/LCD printer. The only one able to catch the most intricate minutiae is the Solus, but its printable area is a fraction of the Moai's.

A bit of different story for [Hi-Temp resin](https://peopoly.net/collections/frontpage/products/model-hitemp-resin-grey). It's a special resin formulated by Peopoly that offers a very smooth surface with very little layering even at 60µm. The downside is that you lose a little bit of details (it's like applying a blur filter to the 3d model) and the surface with supports will be a little lower def. But all in all it's a magnificent resin if you need smooth prints that need very little post processing.

![Left hi-temp resin, right standard gray resin](/peopoly-moai-an-honest-review/images/DSC00737.jpg)

## Conclusions

The Moai is quite an unique product. The large print area is very appealing both for printing big models or multiple copies of the same item. With 5" 2K LCD displays being readily available, LCD SLA printers are becoming real performers. The quality of high end LCD/SLA is probably higher than the Moai but the print area is still very limited and the LCD itself is a pricey consumable. Not to mention that with a Laser SLA you have a much wider resin selection.  

The Form2 or the Solus are both higher definition machines but that comes at 3x of the cost. Peopoly resins are also cheaper than the competitors and with the introduction of the FEP vat you don't even need to spend in new vats or in refurbishing old ones.

Peopoly placed a great product at a great price point. If spending time (a lot of it) calibrating and tinkering doesn't scare you, the Moai is the best resin 3D printer money can buy. It's not the highest resolution and it comes with a good dose of pain and frustration, but its quality-per-dollar value completely outperforms the competition (please note that I'm deliberately ignoring the $300 LCD printers that are little more than toys).

If you don't need a big print area and you print very sparingly, maybe a good quality LCD SLA is a better option. At the other end of the spectrum if you are after the highest quality possible in a microscopic build area, I'd suggest the Solus. But if you appreciate the wide workable area and a good resin selection all for a reasonable price, well, the Moai is really your only option.
