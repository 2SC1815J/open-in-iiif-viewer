/*
 * Open IIIF Manifest Link In Favorite Viewer
 *
 * Copyright 2017 2SC1815J
 * Released under the MIT license
 */
(function() {
    'use strict';

    browser.storage.sync.get({
        openInBaseUrl: 'http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest='
    }).then((options) => {
        const openInBaseUrlTextInput = document.getElementById('openInBaseUrl');
        openInBaseUrlTextInput.value = options.openInBaseUrl;
        openInBaseUrlTextInput.addEventListener('change', () => {
            browser.storage.sync.set({
                openInBaseUrl: openInBaseUrlTextInput.value
            });
        });
    });
})();