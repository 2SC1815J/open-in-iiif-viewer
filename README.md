# Open IIIF Manifest Link In Favorite Viewer

閲覧中のページに含まれるIIIF Manifestへのリンクをユーザ指定のIIIFビューワで開くブラウザ拡張機能(WebExtension)

## インストール方法 / Install

- Firefoxでは、以下のインストールリンクをクリックすると、この拡張機能をインストールできます。
    - [インストール / install](https://2sc1815j.github.io/Open_IIIF_Manifest_Link_In_Favorite_Viewer/install.html) (signed by mozilla)
- Google Chromeでは、Chromeウェブストア（無料）から、この拡張機能をインストールできます。
    - [Open IIIF Manifest Link In Favorite Viewer (chrome web store)](https://chrome.google.com/webstore/detail/open-iiif-manifest-link-i/pdkbceoglenaneaoebcagpbkocpkhajl)

## 使い方 / Usage

閲覧中のページにIIIF Manifestへのリンクが含まれているとき、ツールバーの拡張機能ボタンを押下すると、拡張機能の設定画面で指定したIIIFビューワを用いて資料を閲覧できます。

![screenshot_toolbar](https://lh3.googleusercontent.com/aBce0Qk59V2pNzZr_dfMwKvAze5TaqfiSQWl6oQPKRUH0MkGq4wcsEsZtjRK9POlWlBrVxt7)

また、IIIF Manifestへのリンクを右クリックして表示されるメニューから、IIIFビューワで開くこともできます。一つのページに複数のIIIF Manifestへのリンクが含まれている場合に便利です。

![screenshot_contextmenu](https://lh3.googleusercontent.com/naIzec7cR6iWnClg435Efj5QnEXKhC8ZTKokMdDFi0vDOtErEaizrcPPjuf6pkvzHQKmucz3)

## 設定項目 / Options

拡張機能の設定画面では、お好みのIIIFビューワに応じて、例えば次のように設定します。
- IIIF Curation Viewerを用いる場合の例（デフォルト）
    - `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=`
- Miradorを用いる場合の例（人文情報学研究所 永崎研宣氏による設置）
    - `http://candra.dhii.jp/nagasaki/mirador_if.php?manifest=`
- Universal Viewerを用いる場合の例
    - `http://universalviewer.io/uv.html?manifest=`
- ビューワで開かずにIIIF Manifest自体を表示する例
    - 設定欄を空にしてください

![screenshot_options](https://lh3.googleusercontent.com/SMlomYG8uHgmgRe-9d9r_21tLBk7mcrhMHHlVxI9nhCcjMqOXaB5d32rKejBv-jAWp9Ekp53Epc)

## 注意点

IIIF Manifestへのリンクを認識できないサイトや誤認識するサイトもあります。