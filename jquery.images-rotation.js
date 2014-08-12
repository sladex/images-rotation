/*
 * Images rotation jQuery plugin | 2014-08-12
 * Copyright (c) 2013-2014 sladex | MIT License
 * https://github.com/sladex/images-rotation
 */

$.fn.imagesRotation = function (options) {
    var defaults = {
            images: [],         // urls to images
            dataAttr: 'images', // html5 data- attribute which contains an array with urls to images
            imgSelector: 'img', // element to change
            interval: 1000,     // ms
            intervalFirst: 500, // first image change, ms
            callback: null      // first argument would be the current image url
        },
        settings = $.extend({}, defaults, options);

    var clearRotationInterval = function ($el) {
            clearInterval($el.data('imagesRotaionTimeout'));
            $el.removeData('imagesRotaionTimeout');
            clearInterval($el.data('imagesRotaionInterval'));
            $el.removeData('imagesRotaionInterval');
        },
        getImagesArray = function ($this) {
            var images = settings.images.length ? settings.images : $this.data(settings.dataAttr);
            return $.isArray(images) ? images : false;
        },
        preload = function (arr) {  // images preloader
            $(arr).each(function () {
                $('<img/>')[0].src = this;
            });
        },
        init = function () {
            var imagesToPreload = [];
            this.each(function () {  // preload next image
                var images = getImagesArray($(this));
                if (images && images.length > 1) {
                    imagesToPreload.push(images[1]);
                }
            });
            preload(imagesToPreload);
        };

    init.call(this);

    this.on('mouseenter.imagesRotation', function () {
        var $this = $(this),
            $img = settings.imgSelector ? $(settings.imgSelector, $this) : null,
            images = getImagesArray($this),
            imagesLength = images ? images.length : null,
            changeImg = function () {
                var prevIndex = $this.data('imagesRotationIndex') || 0,
                    index = (prevIndex + 1 < imagesLength) ? prevIndex + 1 : 0,
                    nextIndex = (index + 1 < imagesLength) ? index + 1 : 0;
                $this.data('imagesRotationIndex', index);
                if ($img && $img.length > 0) {
                    if ($img.is('img')) {
                        $img.attr('src', images[index]);
                    }
                    else {
                        $img.css('background-image', 'url(' + images[index] + ')');
                    }
                }
                if (settings.callback) {
                    settings.callback(images[index]);
                }
                preload([images[nextIndex]]); // preload next image
            };
        if (imagesLength) {
            clearRotationInterval($this); // in case of dummy intervals
            var timeout = setTimeout(function () {
                changeImg();
                var interval = setInterval(changeImg, settings.interval);
                $this.data('imagesRotaionInterval', interval); // store to clear interval on mouseleave
            }, settings.intervalFirst);
            $this.data('imagesRotaionTimeout', timeout);
        }
    }).on('mouseleave.imagesRotation', function () {
        clearRotationInterval($(this));
    }).on('imagesRotationRemove', function () {
        var $this = $(this);
        $this.off('.imagesRotation');
        clearRotationInterval($this);
    });
};

$.fn.imagesRotationRemove = function () {
    this.trigger('imagesRotationRemove');
};