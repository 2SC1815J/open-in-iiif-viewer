/*
 * Open IIIF Manifest Link In Favorite Viewer
 * 
 * Copyright 2017 2SC1815J
 * Released under the MIT license
 */
(function() {
    'use strict';

    function getManifestUrl() {
        var manifestUrl;
        var links = document.links;
        var linksLen = links.length;
        var i;
        //heuristic...
        for (i = 0; i < linksLen; i++) {
            if (/manifest\.json$/.test(links[i].pathname)) {
                manifestUrl = links[i].href;
                break;
            }
        }
        if (!manifestUrl) {
            for (i = 0; i < linksLen; i++) {
                if (/manifest$/.test(links[i].pathname)) {
                    manifestUrl = links[i].href;
                    break;
                }
            }
        }
        if (!manifestUrl || manifestUrl.indexOf('?') !== -1) {
            var re = /(?:&|\?)manifest=((https?:)?\/\/[^&]+)(?:&|$)/;
            var match;
            for (i = 0; i < linksLen; i++) {
                match = links[i].href.match(re);
                if (match) {
                    manifestUrl = match[1];
                    if (!match[2]) {
                        manifestUrl = location.protocol + manifestUrl;
                    }
                    break;
                }
            }
            if (!manifestUrl) {
                //embedded Universal Viewer
                var elements = document.getElementsByClassName('uv');
                for (i = 0; i < elements.length; i++) {
                    if (elements[i].dataset.uri) {
                        manifestUrl = elements[i].dataset.uri;
                        break;
                    }
                }
            }
            if (!manifestUrl) {
                match = location.search.match(re);
                if (match) {
                    manifestUrl = match[1];
                }
            }
        }
        return manifestUrl;
    }

    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
    // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
    // Code samples added on or after August 20, 2010 are in the public domain.
    browser.runtime.onMessage.addListener(request => {
        if (request.message === 'getManifestUrl') {
            return Promise.resolve({url: getManifestUrl()});
        }
    });
})();