---
title: How to Root Moto X (2nd Gen) XT1093-Victara
author: Usama
layout: post
date: 2018-08-19
description: Steps to unlock its boot loader and root Moto X 2nd Gen
excerpt_separator: <!--more-->
---

Steps to unlock its boot loader and root Moto X 2nd Gen.

<!--more-->

## Step 1 - Unlock boot loader

*Note: This will reset your phone completely. Make backup.*

Boot loader can be unlocked following this link from Motorola itself

https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a


## Step 2 - Install TWRP Recovery

After successful unlock, Install the TWRP Recovery. This will replace the default recovery screen in Moto X 2014 and replace it with much better touch supported recovery screen by TWRP.

Detailed and other optional steps can be found here https://twrp.me/motorola/motorolamotox2014.html

Download image from https://dl.twrp.me/victara/ and rename to twrp.img (or don't rename)

Go to `platform-tools` directory in your Android SDK installation folder and ensure that there is `adb.exe`. Run the following commands in this directory

```
adb reboot bootloader
fastboot flash recovery twrp.img
fastboot reboot
```

## Step 3 - Install SuperSU

1. Download SuperSU zip for TWRP from https://forum.xda-developers.com/apps/supersu/stable-2016-09-01supersu-v2-78-release-t3452703
and place it in your phone
2. Reboot into recovery mode and wait for TWRP recovery screen to open
3. Press 'install' and select the SuperSU.zip file that you downloaded and copied to your phone
4. Proceed
5. Reboot

Enjoy the rooted Moto X
