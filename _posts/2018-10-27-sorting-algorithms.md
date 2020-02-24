---
title: Listen and visualize sorting algorithms
author: Usama
layout: post
image: https://smusamashah.github.io/VisualizingSorts/screenshot3.png
description: Visualization of many sorting algorithms which can be listened to and compared with each other side by side
date: 2018-10-26
excerpt_separator: <!--more-->
permalink: /sorting-algorithms-visual-comparison
redirect_from: 
    - /blog/2018/10/26/sorting-algorithms
---

A few weeks ago I found out this [imgur gallery](https://imgur.com/a/voutF) of sorting algorithms through a reddit post. The patterns which emerged while sorting random data looked very beautiful and amazing with the only catch that they were not interactive. You can not play with them. I decided make them in JavaScript to see what many different sorting algorithms look like, the patterns they create, while also learning them in the process.

{% include figure.html url=page.image caption="Quick sort running on 512 arrays of size 512" %}

In this [video](https://www.youtube.com/watch?v=kPRA0W1kECg) you can listen to sound patterns of various alogrithms. Same can be done in JavaScript using its [audio api](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). I added it along with visualization and now you can listen to sorting algorithms :) 

## [Demo](https://smusamashah.github.io/VisualizingSorts/sorting.html)

Works on Chrome Desktop and Chrome Mobile

## What it looks like

I used [CanvasRecorder.js](https://github.com/SMUsamaShah/CanvasRecorder) to record these videos.

[**Bubble Sort**](https://en.wikipedia.org/wiki/Bubble_sort) is kind of Hello world of sorting algorithms. To perform bubble sort, loop through array while keeping an eye on current and next element and swap these two whenever current one is bigger until you reach the end. Keep repeating this process until no swap is done in a loop.

[**Cocktail Sort**](https://en.wikipedia.org/wiki/Cocktail_shaker_sort) is bubble sort which bounces back and forth instead of going in only one direction. To do this, instead of starting from the beginning on every iteration, start swapping in reverse when you reach the end.

[**Odd-Even Sort**](https://en.wikipedia.org/wiki/Odd–even_sort) is a modification of bubble sort with two loops, one for even indexes and one for odd.

{% include video_webm.html url="/VisualizingSorts/bubble-vs-cocktail-128.webm" caption="Bubble sort and Cocktail sort" %}

[**Insertion Sort**](https://en.wikipedia.org/wiki/Insertion_sort) bubbles each item back to its correct position: Start from second item, and loop back to first item while swapping where required. Pick next item and repeat til end of array.

[**Gnome Sort**](https://en.wikipedia.org/wiki/Gnome_sort) (Stupid Sort) is similar to insertion sort. Unlike insertion sort, which even after correctly positioning the selected item still runs upto first item, skips those comparisons but has to iterate back to next item which needs to be sorted.

These two look exactly same when visualized. You can only see the difference on lower detail levels.

{% include video_webm.html url="/VisualizingSorts/insertion-vs-gnome-128.webm" caption="Insertion sort and Gnome sort" %}

[**Comb Sort**](https://en.wikipedia.org/wiki/Comb_sort) is like bubble sort with varying swap item distance. Bubble sort always swap adjacent items, while Comb Sort starts swapping very distant items and gradually narrows the distance on each iteration. This also increases the number of comparisons on each iteration.

[**Selection Sort**](https://en.wikipedia.org/wiki/Selection_sort) is a simple algorithm. It starts from first item and iterate through remaining list to find a smaller item and, when found, swap with it and move to next item and repeat the process.

[**Merge Sort**](https://en.wikipedia.org/wiki/Merge_sort) is the basic divide and conquer algorithm. It splits an array recursively until it can not be further divided. Sorting happens on the merge step. Splitted arrays are merged in a way so that final array is sorted. This goes on until all pieces are merged together making a sorted array. I splitted the arrays in-place and only created copy of each split to put back in original array.

**Parallel Merge Sort** is different only in that both recursive split calls are run in parallel instead of one after another. Arrays are drawn from left to right and waves can be seen going because initially there are too many async calls which reduce with each merge.

{% include video_webm.html url="/VisualizingSorts/merge_parallel-128.webm" caption="Parallel Merge sort" %}

When compared with normal merge sort, you can see how fast it is

{% include video_webm.html url="/VisualizingSorts/merge-vs-merge_parallel-128.webm" caption="Merge vs Parallel Merge sort" %}

[**Radix Sort**](https://en.wikipedia.org/wiki/Radix_sort) is a weird sorting method. It sorts without doing comparisons. It put items in buckets based on their last digits, then empty the buckets back into the list. This is repeated for the second last digit and so one until the last digit where it will be all sorted. e.g. If largest number in an array has 4 digits, it will iterate only 4 times.

[**Quicksort**](https://en.wikipedia.org/wiki/Quicksort) is a little different. It puts all smaller and all greater items on left and right of a selected pivot in any order. Start by selecting right most as pivot. Compare with first item, if bigger, move it to right side of pivot by shifting pivot to left. Continue moving right and shifting pivot to left until all bigger items are on its right. Repeat on both sides of pivot.

{% include video_webm.html url="/VisualizingSorts/merge-vs-heap.webm" caption="Merge sort and Heap sort" %}

{% include video_webm.html url="/VisualizingSorts/shell-vs-quick-512.webm" caption="Shell sort and Quick sort" %}

Comb sort is the smoothest one

{% include video_webm.html url="/VisualizingSorts/comb-vs-shell-vs-heap-128.webm" caption="Comb sort and Shell sort" %}


## What I learned

I learned some algorithms plus a few other things while doing it. `setTimeout` and `setInteral` are costly. When used inside a loop, which completes within a millisecond even after doing thousands of swaps, these calls increased the time to ~20ms.

Very first and extremely horrible approach was to store the state of array on each step and play it back on canvas. It used way too much memory to even think about using bigger (greater than 100 elements) array. 

Next approach was to only store swap and write operations (only indexes) in the array. Although it didn't use as much memory, playing back was still very slow.

Then I used `async/await` and a sleep function which waits on setTimeout. This gave more control over the detail of visualizations and made the code easier to work on. It was still not fast enough. Everything slowed down when I increased the data grid size to around 200 to 300. Another improvement was drawing only what's changed instead of whole array. That made a huge difference in speed. What *did it* in the end to display sorting on 512x512 smoothly was rendering on [`OffscreenCanvas`](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas) and keep copying back from it on the visible canvas.

### What more

More algorithms, plot in time domain to get the pattern in one picture like [this](https://medium.com/@dschnr/visualizing-sorting-algorithms-in-2d-space-c85dcda72f5c)
