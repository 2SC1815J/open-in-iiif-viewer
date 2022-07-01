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
        //Find a link to something like IIIF manifest.
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
        function getManifestUrlFromQueryParam(url) {
            var manifestUrl;
            var canvasUrl;
            if (url && url.indexOf('?') !== -1) {
                var params = new URL(url).searchParams; //IE is not supported
                //IIIF Drag and drop
                //http://zimeon.github.io/iiif-dragndrop/
                var val = params.get('manifest');
                if (val) {
                    manifestUrl = val;
                    val = params.get('canvas');
                    if (val) {
                        canvasUrl = val;
                    }
                } else {
                    //IIIF Content State API
                    //https://iiif.io/api/content-state/1.0/
                    val = params.get('iiif-content');
                    if (val && val.startsWith('http')) {
                        //This criterion does not work correctly with a relative URL.
                        manifestUrl = val;
                    }
                }
            }
            if (manifestUrl) {
                return {manifestUrl: manifestUrl, canvasUrl: canvasUrl};
            } else {
                return null;
            }
        }
        if (!manifestUrl || manifestUrl.indexOf('?') !== -1) {
            //Find a IIIF manifest URL in query parameters.
            var result;
            for (i = 0; i < linksLen; i++) {
                result = getManifestUrlFromQueryParam(links[i].href);
                if (result) {
                    manifestUrl = result.manifestUrl;
                    canvasUrl = result.canvasUrl;
                    break;
                }
            }
            if (!manifestUrl) {
                result = getManifestUrlFromQueryParam(location.href);
                if (result) {
                    manifestUrl = result.manifestUrl;
                    canvasUrl = result.canvasUrl;
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
                //hope someday these ad-hoc codes will be unnecessary...
                //ref. https://github.com/2SC1815J/open-in-iiif-viewer/issues/1
                if (location.hostname === 'gallica.bnf.fr') {
                    //ad-hoc support for Gallica
                    //http://api.bnf.fr/api-iiif-de-r%C3%A9cup%C3%A9ration-des-images-de-gallica
                    //http://www.bnf.fr/fr/professionnels/issn_isbn_autres_numeros/a.ark.html
                    //http://www.cdlib.org/uc3/naan_registry.txt
                    var match = location.pathname.match(/^\/ark:\/12148\/([a-z0-9]+)(?:\/|$)/);
                    if (match) {
                        //20180620: Gallica switched to HTTPS
                        var identifier = 'ark:/12148/' + match[1];
                        manifestUrl = 'https://gallica.bnf.fr/iiif/' + identifier + '/manifest.json';
                    }
                } else if (location.hostname === 'www.europeana.eu') {
                    //ad-hoc support for Europeana
                    for (i = 0; i < window.frames.length; i++) {
                        var frame = window.frames[i];
                        if (/iiif/.test(frame.location.pathname)) {
                            var params = new URL(frame.location.href).searchParams;
                            manifestUrl = params.get('uri');
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