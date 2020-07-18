---
author: Usama
date: 2018-10-26
description: A simple script to record canvas to webm
url: /canvas-recorder
aliases:
  - /blog/2018/10/26/CanvasRecorder
title: CanvasRecorder.js
categories:
  - Code
tags:
  - js
---


I made some visualizations in HTML5 canvas and wanted to record them to display in blog.
Could not find a simple way to do that. [CCapture.js](https://github.com/spite/ccapture.js) added too much performance overhead which made animations slow. 
CanvasRecorder.js uses built in [`MediaRecorder`](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) which is apparently the simplest and most effitient way to record whatever is happening on canvas.

NOTE: I have only tested it with Chrome and it should work fine with Firefox

Link: [CanvasRecorder](https://github.com/SMUsamaShah/CanvasRecorder)

## How to use

Create a recorder

```javascript
const canvas = document.getElementById('animation');
const recorder = new CanvasRecorder(canvas);
```

```javascript
// optional: bits per second for video quality, defaults to 2.5Mbps
const recorder = new CanvasRecorder(canvas, 4500000);
```

Start recording
```javascript
recorder.start();
```

Stop recording
```javascript
recorder.stop();
```

Save/download recording
```javascript
recorder.save();

// Save with given file name
recorder.save('busy_motion.webm');
```