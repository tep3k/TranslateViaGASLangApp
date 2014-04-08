# TranslateViaGASLangApp
GASのLanguageAppを使って無料の翻訳APIをつくる

## GAS
1. GASファイルをつくる

GASファイルをアップロード出来ないため手動で

 * TranslateViaGASLangApp（名前は任意）フォルダを作る
 * スクリプトを作る
 * content.gsの内容を貼り付ける

1. GASファイルを公開する
https://developers.google.com/apps-script/execution_web_apps?hl=ja#deploying

1. 試してみる
https://script.google.com/macros/s/[EDIT_YOURKEY]/exec?q=test

※[EDIT_YOURKEY]部分を修正する

こんな結果になればOK
```
callback({"sourceText":"test","translatedText":"テスト"})
```

## サンプルブックマークレット
選択したテキストの翻訳結果をアラートで表示する

1. jsファイルのAPIリンクを変更する
```
link : "//script.google.com/macros/s/[EDIT_YOURKEY]/exec",
```
1. webapp配下をgoogle dirive等どこかしらにホスティングする

1. ブックマークレットのURLを確認する

 * ホスティングしたindex.htmlを表示してbookmarklet linkを確認