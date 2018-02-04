# Open in IIIF Viewer

A Firefox/Chrome extension to open IIIF manifest link in your favorite IIIF viewer.

(This browser extension is formerly named “Open IIIF Manifest Link in Favorite Viewer.”)

## Install

- Firefox
    - [Install](https://2sc1815j.github.io/open-in-iiif-viewer/install.html) (signed by Mozilla)
    - If you use Firefox ESR 52, please set `webextensions.storage.sync.enabled` to `true` in about:config.
- Google Chrome
    - [Chrome Web Store](https://chrome.google.com/webstore/detail/pdkbceoglenaneaoebcagpbkocpkhajl)

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

![screenshot_options](https://lh3.googleusercontent.com/hUIP21cmt6LWpJFnvKnHIzUC5Wf4ZTc9QC1vUq50Ook8XGBkUs6GYvJ6DSO5C2zMOtfjKU7lQp0)

Also, you can set a more complex pattern which contains placeholders `{manifest_URI}` and `{canvas_URI}`.

For example:
- Open in IIIF Curation Viewer
    - `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest={manifest_URI}&canvas={canvas_URI}&lang=en`
- Open in Mirador
    - `http://2sc1815j.net/mirador-loader/?manifest={manifest_URI}&canvas={canvas_URI}`
- Open in Universal Viewer
    - `http://2sc1815j.net/uv-loader/?manifest={manifest_URI}&canvas={canvas_URI}`

## Notes

On some web pages, the extension cannot recognize links to IIIF manifests or may misrecognize links to non-IIIF manifests.

This uncertainty is reduced if the IIIF community specifies (or recommends) the machine-readable patterns for a link to a IIIF manifest. See a [proposal](https://github.com/2SC1815J/open-in-iiif-viewer/issues/1).

The list of IIIF websites on which the extension works or not is as follows.

|Website|Works?|Example|
|---|---|---|
|Biblissima|Yes|[test](http://beta.biblissima.fr/en/ark:/43093/mdata1939ea3de23cd3b1231f26ba9bdc012c34a76569)|
|Bodleian Libraries|Yes<sup>[1](#note1)</sup>|[test](https://digital.bodleian.ox.ac.uk/inquire/Discover/Search/#/)|
|Cambridge University Library|Yes|[test](https://cudl.lib.cam.ac.uk/view/MS-SPR-ECTOPLASM/1)|
|Digital Vatican Library|Yes|[test](https://digi.vatlib.it/view/MSS_Reg.lat.1896.pt.A)|
|e-codices|Yes|[test](http://www.e-codices.unifr.ch/en/searchresult/list/one/fmb/cb-0601a)|
|Europeana|Yes<sup>[3](#note3)</sup>|[test](http://www.europeana.eu/portal/en/record/9200365/BibliographicResource_3000149266571.html)|
|Gallica|Yes<sup>[3](#note3)</sup>|[test](http://gallica.bnf.fr/ark:/12148/btv1b525033083/)|
|Harvard Art Museums|Yes|[test](https://www.harvardartmuseums.org/collections/object/199194)|
|Heidelberg University Library|Yes|[test](http://digi.ub.uni-heidelberg.de/diglit/ia00032100)|
|J. Paul Getty Museum|Yes|[test](http://www.getty.edu/art/collection/objects/287186/)|
|Qatar Digital Library|Yes|[test](https://www.qdl.qa/en/archive/81055/vdc_100023867439.0x000027)|
|Stanford Libraries|Yes/Partial<sup>[2](#note2)</sup>|[test](https://exhibits.stanford.edu/epl/catalog/yc385kr0856)/[test](https://searchworks.stanford.edu/view/vb267mw8946)|
|University of Illinois at Urbana-Champaign Library|Yes|[test](https://digital.library.illinois.edu/items/a73d5ee0-994e-0134-2096-0050569601ca-b)|
|Wellcome Library|Yes|[test](https://wellcomelibrary.org/item/b12029348)|
|World Digital Library|Yes|[test](https://www.wdl.org/en/item/19477/)|
|Yale Center for British Art|Yes|[test](http://collections.britishart.yale.edu/vufind/Record/1665464)|

#### IIIF Websites in Japan

|Website|Works?|Example|
|---|---|---|
|Database of Pre-modern Japanese Text (CODH)|Yes|[test](http://codh.rois.ac.jp/pmjt/book/200014778/)|
|Database of Pre-Modern Japanese Works (NIJL)|Yes|[test](https://kotenseki.nijl.ac.jp/biblio/200010512/viewer/?ln=en)|
|Digital Collections of Keio University Libraries|Yes|[test](http://dcollections.lib.keio.ac.jp/sites/all/libraries/uv/uv.php?archive=NRE&id=132X-200-3-1)|
|Kyoto University Rare Materials Digital Archive|Yes|[test](https://rmda.kulib.kyoto-u.ac.jp/en/item/rb00013599)|
|Kunideco Image Wall (NDL Lab)|Yes<sup>[1](#note1)</sup>|[test](http://lab.ndl.go.jp/dhii/kunidecoview/)|
|Collection for Study of the Japanese Language History (NINJAL)|Yes<sup>[2](#note2)</sup>|[test](http://dglb01.ninjal.ac.jp/ninjaldl/bunken.php?title=wajisyoransyo)|
|SAT Taishōzō Image DB|Yes|[test](https://dzkimgs.l.u-tokyo.ac.jp/SATi/images.php?alang=en)|
|Shimane University Library Digital Archive Collection|Yes|[test](http://da.lib.shimane-u.ac.jp/content/ja/2294)|
|University of Tokyo Library System|Yes|[test](https://iiif.dl.itc.u-tokyo.ac.jp/repo/s/hyakki/)|

<a id="note1">1</a>: Though the tooltip of the toolbar button is not updated in real time, clicking on the button will open the correct manifest.

<a id="note2">2</a>: Use a context menu item “Open link in IIIF viewer” as needed.

<a id="note3">3</a>: Ad-hoc support.