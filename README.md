# Open IIIF Manifest Link In Favorite Viewer

閲覧中のページに含まれるIIIF Manifestへのリンクを、ユーザ指定のIIIFビューワで開くブラウザ拡張機能(WebExtension)

## インストール方法

- Firefoxでは、以下のリンクをクリックすると、この拡張機能のインストール確認が表示されます。
    - [open_iiif_manifest_link_in_favorite_viewer.xpi](https://github.com/2SC1815J/Open_IIIF_Manifest_Link_In_Favorite_Viewer/raw/master/open_iiif_manifest_link_in_favorite_viewer.xpi)
- Google Chromeでは、デベロッパーモードの「パッケージ化されていない拡張機能を読み込む」機能を利用して、この拡張機能をインストールできます。

## 使い方

閲覧中のページにIIIF Manifestへのリンクが含まれているとき、ツールバーの拡張機能ボタンを押下すると、拡張機能の設定画面で指定したIIIFビューワを用いて資料を閲覧できます。

拡張機能の設定画面では、お好みのIIIFビューワに応じて、例えば次のように設定します。
- IIIF Curation Viewerを用いる場合の例（デフォルト）
    - `http://codh.rois.ac.jp/software/iiif-curation-viewer/demo/?manifest=`
- Universal Viewerを用いる場合の例
    - `http://universalviewer.io/uv.html?manifest=`
- Miradorを用いる場合の例
    - Mirador demo (`http://projectmirador.org/demo/`)はGETパラメータでのManifest指定はできない？
- ビューワを用いずIIIF Manifest自体を表示する例
    - 設定欄を空にしてください

## 注意点

IIIF Manifestへのリンクを拡張機能が認識できないサイトもあります。