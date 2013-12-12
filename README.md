Images rotation jQuery plugin
===============

jQuery plugin
Plugin switches the images while you are holding a mouse cursor on the element.

Live demo: http://sladex.org/images-rotation/

Basic Usage
---------------
````html
<div class="images-rotation"
     data-images='["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg"]'>
  <img src="img/1.jpg" alt="">
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="jquery.images-rotation.min.js"></script>
<script>
  $('.images-rotation').imagesRotation();
</script>
````

Options
---------------
- `images` Push the images array via Javascript. _Default is '[]'_
- `dataAttr` Change html5 data- attribute name. _Default is 'images'_
- `imgSelector` jQuery selector for the image element to makes changes for. _Default is 'img'_
- `interval` Interval between one image switches to another, in ms. _Default is '1000'_
- `intervalFirst` Time delay for the very first switch. _Default is '500'_
- `callback` Callback function, first argument would be the current image url. _Default is 'null'_

License
---------------
Copyright (c) 2013 sladex, released under the MIT License.