---
title: Listen and visualize sorting algorithms
author: Usama
layout: post
date: 2018-10-26
---

![Quicksort](/VisualizingSorts/screenshot3.png)

A few weeks ago I found out this [imgur gallery](https://imgur.com/a/voutF) of sorting algorithms through a reddit post. The patterns which emerged while sorting random data looked very beautiful and amazing with the only catch that they were not interactive. You can not play with them. I decided make them in JavaScript to see what many different sorting algorithms look like, the patterns they create, while also learning them in the process.

A youtube [video](https://www.youtube.com/watch?v=kPRA0W1kECg) where you can listen to different sound patterns of various alogrithms. Same can be done in JavaScript using its [audio api](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). I added it along with visualization and now you can listen to sorting algorithms :) 

Link: https://smusamashah.github.io/VisualizingSorts/sorting.html

## What it looks like

I used [CanvasRecorder.js](https://github.com/SMUsamaShah/CanvasRecorder) to record these videos.

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/merge-vs-heap.webm" type="video/webm">
  </video>
</div>
Merge sort and Heap sort

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/bubble-vs-cocktail-128.webm" type="video/webm">
  </video>
</div>
Bubble sort and Cocktail sort

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/shell-vs-quick-512.webm" type="video/webm">
  </video>
</div>
Shell sort and Quick sort

Insertion and gnome sort look exactly same.

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/insertion-vs-gnome-128.webm" type="video/webm">
  </video>
</div>
Insertion sort and Gnome sort

Comb sort is the smoothest one
<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/comb-vs-shell-vs-heap-128.webm" type="video/webm">
  </video>
</div>
Comb sort and Shell sort

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/merge-vs-quick-vs-heap-512.webm" type="video/webm">
  </video>
</div>
Merge, Quick and Heap sort

Merge sort can easily be made to run parallel/asynchronusly because both recursive calls handle different data. Arrays are drawn from left to right and waves can be seen going because initially there are too many async calls which reduce with each merge.

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/merge_parallel-512.webm" type="video/webm">
  </video>
</div>
Parallel Merge sort

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/merge_parallel-128.webm" type="video/webm">
  </video>
</div>
On lesser data

When compared with normal merge

<div class="video_container">
  <video loop autoplay controls>
    <source src="/VisualizingSorts/merge-vs-merge_parallel-128.webm" type="video/webm">
  </video>
</div>
Merge vs Parallel Merge sort




## What I learned

I learned a few things while doing it. `setTimeout` and `setInteral` are costly. When used inside a loop, which completes within a millisecond even after doing thousands of swaps, these calls increased the time to ~20ms.

Very first and extremely horrible approach was to store the state of array on each step and play it back on canvas. It used way too much memory to even think about using bigger (greater than 100 elements) array. 

Next approach was to only store swap and write operations (only indexes) in the array. Although it didn't use as much memory, playing back was still very slow.

Then I used `async/await` and a sleep function which waits on setTimeout. This gave more control over the detail of visualizations and made the code easier to work on. It was still not fast enough. Everything slowed down when I increased the data grid size to around 200 to 300. Another improvement was drawing only what's changed instead of whole array. That made a huge difference in speed. What *did it* in the end to display sorting on 512x512 smoothly was rendering on [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) and keep copying back from it on the visible canvas.

### What more

More algorithms, plot in time domain to get the pattern in one picture like [this](https://medium.com/@dschnr/visualizing-sorting-algorithms-in-2d-space-c85dcda72f5c)
