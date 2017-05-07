exif-js
========

This is a library that supports client side EXIF parsing inside the browser.
Images are taken from the DOM and the gathered EXIF information is used to generate an overlay that is displayed when hovering over the image.

The original library that does the EXIF parsing was done by @jseidelin https://github.com/exif-js/exif-js.
The additional script in this repository can be integrated in any website where it will process all images
and add a hover overlay with the most relevant EXIF data. Images without EXIF information are automatically ignored.
In the image below you can see this script in action:

![](https://raw.github.com/dschanoeh/exif-js/master/example/example.png)

By default only the most basic information is displayed but the script can easily be altered to generate
different EXIF output.


Example
-------
Download the source code and open the _index.html_ file inside the example folder to get an impression of what the overlay looks like.

Usage in Wordpress
------------------
The integration in Wordpress is straightforward. Just place the four files on your webspace and add them to the _header.php_
```html
<script type="text/javascript" src="exif/exif.js"></script>
<script type="text/javascript" src="exif/replaceImages.js"></script>

<link rel='stylesheet' href='exif/style.css' type='text/css' media='all' />
```
