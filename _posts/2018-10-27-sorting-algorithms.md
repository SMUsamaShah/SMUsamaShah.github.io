---
title: Listen and visualize sorting algorithms
author: Usama
layout: post
date: 2018-10-26
---

A few weeks ago I found out this [imgur gallery](https://imgur.com/a/voutF) of sorting algorithms through a reddit post. The patterns which emerged while sorting random data looked very beautiful and amazing with the only catch that they were not interactive. You can not play with them. I decided make them in JavaScript to see what many different sorting algorithms look like, the patterns they create, while also learning them in the process.

A youtube [video](https://www.youtube.com/watch?v=kPRA0W1kECg) where you can listen to different sound patterns of various alogrithms. Same can be done in JavaScript using its [audio api](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). I added it along with visualization and now you can listen to sorting algorithms :) 

Link: https://smusamashah.github.io/VisualizingSorts/sorting.html

<div class="video_container">
  <video playsinline loop autoplay allowfullscreen="true">
    <source src="/VisualizingSorts/merge-vs-heap.webm" type="video/webm">
  </video>
</div>
Merge sort and Heap sort 128x128


## What I learned

I learned a few things while doing it. `setTimeout` and `setInteral` are costly. When used inside a loop, which completes within a millisecond even after doing thousands of swaps, these calls increased the time to ~20ms.

Very first and extremely horrible approach was to store the state of array on each step and play it back on canvas. It used way too much memory to even think about using bigger (greater than 100 elements) array. 

Next approach was to only store swap and write operations (only indexes) in the array. Although it didn't use as much memory, playing back was still very slow.

Then I used `async/await` and a sleep function which waits on setTimeout. This gave more control over the detail of visualizations and made the code easier to work on. It was still not fast enough. Everything slowed down when I increased the data grid size to around 200 to 300. Another improvement was drawing only what's changed instead of whole array. That made a huge difference in speed. What *did it* in the end to display sorting on 512x512 smoothly was rendering on [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) and keep copying back from it on the visible canvas.
