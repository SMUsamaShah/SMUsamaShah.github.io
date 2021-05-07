---
author: Usama
date: 2021-05-07
description: Split String in Java vs C#, Python, JavaScript
url: /split-string
title: Split String in Java vs C#, Python, JavaScript
categories:
  - Code
---

```C# 
// C#
Console.WriteLine("".Split('=').Length); // 1
Console.WriteLine("=".Split('=').Length); // 2
```

```python
// Python
print ( len("".split("=")) ); // 1
print ( len("=".split("=")) ); // 2
```

```javascript
// JavaScript
console.log("".split("=").length); // 1
console.log("=".split("=").length); // 2
```

then there is Java

```java
// Java
System.out.println("".split("=").length); // 1
System.out.println("=".split("=").length); // 0
```
