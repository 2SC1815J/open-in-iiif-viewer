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
        function getManifestUrlFromUrlPart(urlPart, href) {
            //urlPart must not be a full URL; href must be an absolute URL
            var manifestUrl;
            var canvasUrl;
            if (urlPart) {
                var params = new URLSearchParams(urlPart);
                //IIIF Drag and drop
                //http://zimeon.github.io/iiif-dragndrop/
                var val = params.get('manifest');
                if (val) {
                    var baseUrl = href || location.href;
                    manifestUrl = (new URL(val, baseUrl)).href;
                    val = params.get('canvas');
                    if (val) {
                        canvasUrl = (new URL(val, baseUrl)).href;
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
            return manifestUrl ? { manifestUrl: manifestUrl, canvasUrl: canvasUrl } : null;
        }
        function getManifestUrlFromQueryParam(href) {
            if (href && href.indexOf('?') !== -1) {
                var url = new URL(href);
                return getManifestUrlFromUrlPart(url.search, url.href);
            }
            return null;
        }
        function getManifestUrlFromFragment(href) {
            if (href && href.indexOf('#') !== -1) {
                var url = new URL(href);
                return getManifestUrlFromUrlPart(url.hash.substring(1), url.href);
            }
            return null;
        }

        var manifestUrl;
        var canvasUrl;
        try {
            var links = document.links;
            var linksLen = links.length;
            var i;
            //Find a link to something like a IIIF Manifest URL heuristically....
            //First priority
            for (i = 0; i < linksLen; i++) {
                if (/manifest\.json$/.test(links[i].pathname)) {
                    manifestUrl = links[i].href; //href is an absolute URL
                    break;
                }
            }
            //Second priority
            if (!manifestUrl) {
                for (i = 0; i < linksLen; i++) {
                    if (/manifest$/.test(links[i].pathname)) {
                        manifestUrl = links[i].href; //href is an absolute URL
                        break;
                    }
                }
            }
            if (!manifestUrl || manifestUrl.indexOf('?') !== -1) {
                var result;
                //Find a IIIF Manifest URL in query parameters.
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
                    //Embedded Universal Viewer v2
                    //https://github.com/UniversalViewer/universalviewer/wiki/Embedding
                    var elements = document.getElementsByClassName('uv');
                    for (i = 0; i < elements.length; i++) {
                        if (elements[i].dataset.uri) {
                            manifestUrl = elements[i].dataset.uri;
                            if (manifestUrl) {
                                manifestUrl = (new URL(manifestUrl, location.href)).href;
                            }
                            break;
                        }
                    }
                }
                if (!manifestUrl) {
                    //hope someday these ad-hoc codes will be unnecessary...
                    //ref. https://github.com/2SC1815J/open-in-iiif-viewer/issues/1
                    var match;
                    if (location.hostname === 'gallica.bnf.fr') {
                        //ad-hoc support for Gallica
                        //http://api.bnf.fr/api-iiif-de-r%C3%A9cup%C3%A9ration-des-images-de-gallica
                        //http://www.bnf.fr/fr/professionnels/issn_isbn_autres_numeros/a.ark.html
                        //http://www.cdlib.org/uc3/naan_registry.txt
                        match = location.pathname.match(/^\/ark:\/12148\/([a-z0-9]+)(?:\/|$)/);
                        if (match) {
                            //20180620: Gallica switched to HTTPS
                            var identifier = 'ark:/12148/' + match[1];
                            manifestUrl = 'https://gallica.bnf.fr/iiif/' + identifier + '/manifest.json';
                        }
                    } else if (location.hostname === 'www.europeana.eu') {
                        //ad-hoc support for Europeana
                        result = (function() {
                            var iframes = document.getElementsByTagName('iframe');
                            for (var i = 0; i < iframes.length; i++) {
                                if (iframes[i].src) {
                                    var url = new URL(iframes[i].src, location.href);
                                    if (/iiif/.test(url.pathname)) {
                                        var params = url.searchParams;
                                        var manifestUrl = params.get('uri');
                                        if (manifestUrl) {
                                            manifestUrl = (new URL(manifestUrl, url.href)).href;
                                            return manifestUrl;
                                        }
                                    }
                                }
                            }
                            return null;
                        })();
                        if (result) {
                            manifestUrl = result;
                        }
                    } else if (location.hostname === 'archive.org') {
                        //ad-hoc support for Internet Archive
                        //https://archive.readme.io/docs/ia-iiif-faqs
                        //Some manifests cannot load images in a IIIF viewer.
                        var mediatype = document.querySelector('meta[property="mediatype"]');
                        if (mediatype) {
                            var mediaContent = mediatype.getAttribute('content');
                            if (mediaContent === 'texts' || mediaContent === 'image') {
                                match = location.pathname.match(/^\/details\/([^/]+)(?:\/|$)/);
                                if (match) {
                                    manifestUrl = 'https://iiif.archivelab.org/iiif/' +  match[1] + '/manifest.json';
                                }
                            }
                        }
                    }
                }
                if (!manifestUrl) {
                    //Embedded Universal Viewer v4
                    //https://codesandbox.io/s/uv-embed-example-wyus9
                    //Find a IIIF Manifest URL from the fragment part of an iframe's src.
                    var iframes = document.getElementsByTagName('iframe');
                    for (i = 0; i < iframes.length; i++) {
                        if (iframes[i].src) {
                            var iframeHref = (new URL(iframes[i].src, location.href)).href;
                            result = getManifestUrlFromFragment(iframeHref) || getManifestUrlFromQueryParam(iframeHref);
                            if (result) {
                                manifestUrl = result.manifestUrl;
                                canvasUrl = result.canvasUrl;
                                break;
                            }
                        }
                    }
                }
            }
            //Allow only http/https.
            if (manifestUrl && !/^https?:\/\//.test(manifestUrl)) {
                manifestUrl = undefined;
            }
            if (canvasUrl && !/^https?:\/\//.test(canvasUrl)) {
                canvasUrl = undefined;
            }
        } catch(e) {
            //
        }
        return { manifest: manifestUrl, canvas: canvasUrl };
    }

    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
    // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
    // Code samples added on or after August 20, 2010 are in the public domain.
    browser.runtime.onMessage.addListener(request => {
        if (request.message === 'getManifestUrl') {
            return Promise.resolve({ url: getManifestUrl() });
        }
    });
})();