/*
 * Open IIIF Manifest Link In Favorite Viewer
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
    
    function sendMessageToTabs(function_) {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(tabs => {
            for (let tab of tabs) {
                browser.tabs.sendMessage(
                    tab.id,
                    {message: 'getManifestUrl'}
                ).then(response => {
                    function_(response.url);
                }).catch(onError);
            }
        }).catch(onError);
    }
    
    function onError() {
        browserActionButtonOff();
    }
    
    function openInViewer(url) {
        if (url) {
            browser.storage.sync.get({
                openInBaseUrl: 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest='
            }).then(options => {
                var viewerUrl = options.openInBaseUrl + url;
                browser.tabs.create({url: viewerUrl});
            });
        }
    }

    function openNewTab() {
        sendMessageToTabs(openInViewer);
    }
    browser.browserAction.onClicked.addListener(openNewTab);

    // icons: 'Ligature Symbols' (by Kazuyuki Motoyama) under the SIL Open Font License. 
    // http://kudakurage.com/ligature_symbols/
    function browserActionButtonOff() {
        browser.browserAction.setTitle({title: 'IIIF Manifest not found'});
        browser.browserAction.setIcon({path: 'icon_off.svg'});
    }
    function updateBrowserActionButton() {
        sendMessageToTabs(url => {
            if (url) {
                stopTimer();
                browser.browserAction.setTitle({title: url});
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
                if (info.linkUrl.indexOf('?') !== -1) {
                    var re = /(?:&|\?)manifest=((https?:)?\/\/[^&]+)(?:&|$)/;
                    var match = info.linkUrl.match(re);
                    if (match) {
                        manifestUrl = match[1];
                        if (!match[2]) {
                            manifestUrl = 'http://' + manifestUrl;
                        }
                    }
                }
                if (manifestUrl) {
                    openInViewer(manifestUrl);
                }
            }
        }
    });
})();