var replaceImage=function(im) {
    EXIF.getData(im, function() {
        make = EXIF.getTag(im, "Make"),
        model = EXIF.getTag(im, "Model");
        lata = EXIF.getTag(im, "GPSLatitude");
        lona = EXIF.getTag(im, "GPSLongitude");
        aperture = parseFloat(EXIF.getTag(im, "FNumber"));
        exposure = parseFloat(EXIF.getTag(im, "ExposureTime"));
        iso = parseFloat(EXIF.getTag(im, "ISOSpeedRatings"));
        focalLength = parseFloat(EXIF.getTag(im, "FocalLength"));
        var text = "";
        var overlaytext = "";
        var fields = 0;

        if(!isNaN(exposure)) {
            overlaytext += '<div class="exifelement"><i class="icon-time"></i> ';
            if(exposure < 1) {
                text = text + "1/" + Math.round(1.0/exposure);
                overlaytext += '1/' + Math.round(1.0/exposure);
            } else {
                text = text + Math.round(exposure);
                overlaytext += Math.round(exposure);
            }
            overlaytext += '</div>';
            fields++;
        }

        if(!isNaN(aperture)) {
            text = text + " at f/" + aperture;
            overlaytext += '<div class="exifelement"><i class="icon-bullseye"></i> ';
            overlaytext += 'f/' + aperture
            overlaytext += '</div>';
            fields++;
        }

        if(!isNaN(iso)) {
            overlaytext += '<div class="exifelement">';
            text = text + " with ISO " + iso;
            overlaytext = overlaytext + "ISO " + iso;
            overlaytext += '</div>';
            fields++;
        }
        if(make && model) {
            /* Make sure make is not displayed twice */
            if(model.indexOf(make) === 0) {
                model = model.substr(make.length+1);
            }

            text = text + " (" + make + " " + model;
            overlaytext += '<div class="exifelement"><i class="icon-tag"></i> ';
            overlaytext += make;
            overlaytext += '</div>';
            overlaytext += '<div class="exifelement"><i class="icon-camera"></i> ';
            overlaytext += model;
            overlaytext += '</div>';

            fields+=2;
        }

        if(!isNaN(focalLength)) {
            overlaytext += '<div class="exifelement"><i class="icon-resize-full"></i> ';
            text = text + " at " + focalLength + "mm";
            overlaytext += focalLength + "mm";
            overlaytext += '</div>';
            fields++;
        }

        text += ")";

        if(lata && lona) {
            lat = lata[0] + (1.0/60.0) * lata[1];
            lon = lona[0] + (1.0/60.0) * lona[1];
            overlaytext += '<div class="exifelement"><i class="icon-map-marker"></i> ';
            overlaytext += ' <a target="_blank" href="http://maps.google.com/?q=';
            overlaytext += lat.toString();
            overlaytext += ',';
            overlaytext += lon.toString();
            overlaytext += '">map</a>';
            overlaytext += '</div>';
        }

        /* Only display if there is information */
        if(fields > 3) {

            var isTouchDevice = 'ontouchstart' in document.documentElement;
            /* On touch devices we set the title of the image to the generated text */
            if(isTouchDevice) {
                im.parentNode.title = text;
            /* On non touch devices we add the hover box */
            } else {
                var outer = document.createElement('div');
                outer.setAttribute("class", "exifouter");

                var thepost = im.parentNode.parentNode;
                var thea = im.parentNode
                thepost.replaceChild(outer, thea);

                var inner = document.createElement('div');
                inner.setAttribute("class", "exif");
                inner.innerHTML = overlaytext;

                outer.appendChild(thea);
                outer.appendChild(inner);
            }
        }
    });
};

var replaceImages=function() {

    var endsWith = function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };

    allcomplete = true;
    
    for (i = 0; i < document.images.length; ++i) {
        /* If not all images are loaded we are not done */
        if (document.images[i].complete === false) {
            allcomplete = false;
        /* Ignore png images */
        } else if(endsWith(document.images[i].src, "png")) {
            document.images[i].setAttribute("processed", true);
        /* Only process images that were not already processed */
        } else if(document.images[i].getAttribute("processed") === null) {
            replaceImage(document.images[i]);
            document.images[i].setAttribute("processed", true);
        }
    }

    /* If there are images left try again after 200ms */
    if(allcomplete === false) {
        setTimeout(function(){replaceImages();},200);
    }
};

window.onload=replaceImages;

