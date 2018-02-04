/*
 * Open in IIIF Viewer
 * https://github.com/2sc1815j/open-in-iiif-viewer
 * 
 * Copyright 2017 2SC1815J
 * Released under the MIT license
 */
(function() {
    'use strict';

    function getManifestUrl() {
        var manifestUrl;
        var canvasUrl;
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
            //IIIF Drag and drop
            //http://zimeon.github.io/iiif-dragndrop/
            var re = /(?:&|\?)manifest=(.+?)(?:&|$)/;
            var match;
            for (i = 0; i < linksLen; i++) {
                match = links[i].href.match(re);
                if (match) {
                    manifestUrl = decodeURIComponent(match[1]);
                    match = links[i].href.match(/(?:&|\?)canvas=(.+?)(?:&|$)/);
                    if (match) {
                        canvasUrl = decodeURIComponent(match[1]);
                    }
                    break;
                }
            }
            if (!manifestUrl) {
                //embedded Universal Viewer
                //https://github.com/UniversalViewer/universalviewer/wiki/Embedding
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
                    manifestUrl = decodeURIComponent(match[1]);
                }
            }
            if (!manifestUrl) {
                //hope someday these ad-hoc codes will be unnecessary...
                if (location.hostname === 'gallica.bnf.fr') {
                    //ad-hoc support for Gallica
                    //http://api.bnf.fr/api-iiif-de-r%C3%A9cup%C3%A9ration-des-images-de-gallica
                    //http://www.bnf.fr/fr/professionnels/issn_isbn_autres_numeros/a.ark.html
                    //http://www.cdlib.org/uc3/naan_registry.txt
                    match = location.pathname.match(/^\/ark:\/12148\/([a-z0-9]+)(?:\/|$)/);
                    if (match) {
                        var identifier = 'ark:/12148/' + match[1];
                        manifestUrl = 'http://gallica.bnf.fr/iiif/' + identifier + '/manifest.json';
                    }
                } else if (location.hostname === 'www.europeana.eu') {
                    //ad-hoc support for Europeana
                    for (i = 0; i < linksLen; i++) {
                        if (links[i].dataset.type === 'iiif') {
                            manifestUrl = links[i].dataset.uri;
                            break;
                        }
                    }
                }
            } 
        }
        return {manifest: _getAbsoluteUrl(manifestUrl), canvas: _getAbsoluteUrl(canvasUrl)};
    }

    function _getAbsoluteUrl(url) {
        var absoluteUrl;
        if (url) {
            var anchor = document.createElement('a');
            anchor.href = url;
            var href = anchor.href;
            if (/^https?:\/\//.test(href)) {
                absoluteUrl = href;
            }
        }
        return absoluteUrl;
    }

    function getAbsoluteUrl(url) {
        return {manifest: _getAbsoluteUrl(url.manifest), canvas: _getAbsoluteUrl(url.canvas)};
    }

    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
    // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
    // Code samples added on or after August 20, 2010 are in the public domain.
    browser.runtime.onMessage.addListener(request => {
        if (request.message === 'getManifestUrl') {
            return Promise.resolve({url: getManifestUrl()});
        } else if (request.message === 'getAbsoluteUrl') {
            return Promise.resolve({url: getAbsoluteUrl(request.url)});
        }
    });
})();