/*
 * Open in IIIF Viewer
 * https://github.com/2sc1815j/open-in-iiif-viewer
 * 
 * Copyright 2017 2SC1815J
 * Released under the MIT license
 */
(function() {
    'use strict';

    let timeoutHandle = null;

    // ref.
    // https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage
    // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
    // Code samples added on or after August 20, 2010 are in the public domain.

    function sendMessageToActiveTab(message, function_) {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(tabs => {
            for (let tab of tabs) {
                browser.tabs.sendMessage(
                    tab.id,
                    message
                ).then(response => {
                    function_(response.url);
                }).catch(onError);
            }
        }).catch(onError);
    }

    function onError() {
        browserActionButtonOff();
    }

    function encodeURIComponentForQuery(str) {
        // This function is taken from 'IIIF Curation Viewer' released under the MIT license, 
        // Copyright 2016 Center for Open Data in the Humanities, Research Organization of Information and Systems
        var result = encodeURIComponent(str).replace(/%(?:3A|2F|2C)/g, function(c) {
            return decodeURIComponent(c);
        });
        return result;
    }

    function openInViewer(url) {
        if (url && url.manifest) {
            const openInBaseUrlWithoutPlaceholderDefault = 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=';
            browser.storage.sync.get({
                openInBaseUrl: openInBaseUrlWithoutPlaceholderDefault
            }).then(options => {
                var viewerUrl;
                const placeholderManifest = '{manifest_URI}';
                const placeholderCanvas = '{canvas_URI}';
                var manifestUrl = encodeURIComponentForQuery(url.manifest);
                var canvasUrl;
                if (url.canvas) {
                    canvasUrl = encodeURIComponentForQuery(url.canvas);
                }
                if (options.openInBaseUrl.indexOf(placeholderManifest) !== -1) {
                    //Placeholder format (v0.1.9-)
                    //eg. 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest={manifest_URI}&canvas={canvas_URI}'
                    viewerUrl = options.openInBaseUrl.replace(placeholderManifest, manifestUrl);
                    if (options.openInBaseUrl.indexOf(placeholderCanvas) !== -1) {
                        viewerUrl = viewerUrl.replace(placeholderCanvas, canvasUrl ? canvasUrl : '');
                    }
                } else {
                    //Append format (-v0.1.8)
                    viewerUrl = options.openInBaseUrl + manifestUrl;
                    if (canvasUrl && options.openInBaseUrl === openInBaseUrlWithoutPlaceholderDefault) {
                        viewerUrl += '&canvas=' + canvasUrl;
                    }
                }
                browser.tabs.create({url: viewerUrl});
            });
        }
    }

    function openNewTab() {
        sendMessageToActiveTab({message: 'getManifestUrl'}, openInViewer);
    }
    browser.browserAction.onClicked.addListener(openNewTab);

    // icons: 'Ligature Symbols' (by Kazuyuki Motoyama) under the SIL Open Font License. 
    // http://kudakurage.com/ligature_symbols/
    function browserActionButtonOff() {
        browser.browserAction.setTitle({title: 'IIIF manifest not found'});
        browser.browserAction.setIcon({path: 'icon_off.svg'});
    }
    function updateBrowserActionButton() {
        sendMessageToActiveTab({message: 'getManifestUrl'}, url => {
            if (url && url.manifest) {
                stopTimer();
                browser.browserAction.setTitle({title: url.manifest});
                browser.browserAction.setIcon({path: 'icon.svg'});
            } else {
                browserActionButtonOff();
            }
        });
    }
    function stopTimer() {
        if (timeoutHandle !== null) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }
    }
    browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
        if (changeInfo && changeInfo.status === 'complete') {
            //check twice
            const delay = 1000; //ms
            const delay2 = 5000; //ms
            stopTimer();
            timeoutHandle = setTimeout(() => {
                updateBrowserActionButton();
                timeoutHandle = setTimeout(updateBrowserActionButton, delay2);
            }, delay);
        }
    });
    browser.tabs.onActivated.addListener(updateBrowserActionButton);

    browser.contextMenus.create({
        id: 'open-link-in-iiif-viewer',
        title: 'Open link in IIIF viewer',
        contexts: ['link'],
        targetUrlPatterns: ['*://*/*/manifest.json', '*://*/*/manifest', '*://*/*?manifest=*', '*://*/*&manifest=*']
    });
    browser.contextMenus.onClicked.addListener(info => {
        if (info.menuItemId === 'open-link-in-iiif-viewer') {
            if (info.linkUrl) {
                var manifestUrl = info.linkUrl;
                var canvasUrl;
                if (manifestUrl.indexOf('?') !== -1) {
                    var match = manifestUrl.match(/(?:&|\?)manifest=(.+?)(?:&|$)/);
                    if (match) {
                        manifestUrl = decodeURIComponent(match[1]);
                        match = info.linkUrl.match(/(?:&|\?)canvas=(.+?)(?:&|$)/);
                        if (match) {
                            canvasUrl = decodeURIComponent(match[1]);
                        }
                    }
                }
                if (manifestUrl) {
                    var url = {};
                    url.manifest = manifestUrl;
                    url.canvas = canvasUrl;
                    sendMessageToActiveTab({message: 'getAbsoluteUrl', url: url}, openInViewer);
                }
            }
        }
    });
})();