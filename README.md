# Open IIIF Manifest Link In Favorite Viewer

A Firefox/Chrome extension to open IIIF manifest link in your favorite IIIF viewer.

## Install

- Firefox
    - [Install](https://2sc1815j.github.io/Open_IIIF_Manifest_Link_In_Favorite_Viewer/install.html) (signed by Mozilla)
- Google Chrome
    - [Open IIIF Manifest Link In Favorite Viewer (chrome web store)](https://chrome.google.com/webstore/detail/open-iiif-manifest-link-i/pdkbceoglenaneaoebcagpbkocpkhajl)

## Usage

When the web page you are browsing contains a link to a IIIF manifest, by clicking on the toolbar button of this extension, you can open the link in the IIIF viewer specified on the options page.

![screenshot_toolbar](https://lh3.googleusercontent.com/aBce0Qk59V2pNzZr_dfMwKvAze5TaqfiSQWl6oQPKRUH0MkGq4wcsEsZtjRK9POlWlBrVxt7)

By right-clicking on a link to the IIIF manifest, a context menu item “Open link in IIIF viewer” appears, which allows you to open the link in your preferred IIIF viewer.

![screenshot_contextmenu](https://lh3.googleusercontent.com/naIzec7cR6iWnClg435Efj5QnEXKhC8ZTKokMdDFi0vDOtErEaizrcPPjuf6pkvzHQKmucz3)

## Options

On the options page, set the URL field depending on the IIIF viewer you would like to use mainly.

For example:
- Open in IIIF Curation Viewer (default)
    - `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=`
- Open in Mirador (thanks to Kiyonori Nagasaki)
    - `http://candra.dhii.jp/nagasaki/mirador_if.php?manifest=`
- Open in Universal Viewer
    - `http://universalviewer.io/uv.html?manifest=`
- Open as JSON
    - Leave the URL setting field blank.

![screenshot_options](https://lh3.googleusercontent.com/SMlomYG8uHgmgRe-9d9r_21tLBk7mcrhMHHlVxI9nhCcjMqOXaB5d32rKejBv-jAWp9Ekp53Epc)

## Notes

On some web pages, the extension cannot recognize links to IIIF manifests or may misrecognize links to non-IIIF manifests.

This uncertainty is reduced if the IIIF community specifies (or recommends) the machine-readable patterns for a link to a IIIF manifest. See a [proposal](https://github.com/2SC1815J/Open_IIIF_Manifest_Link_In_Favorite_Viewer/issues/1).