KATAPATA サイト内本体用：ミニ導入差し込み済み版

このzipは、アップロードしてもらった最新版KATAPATA HTMLに、ミニ導入用scriptタグを差し込み済みにしたものです。
GitHub上で難読化ファイルを直接編集する必要はありません。

入っているファイル:
- tools/sloper/app/katapata.html
- assets/js/katapata-site-mini-intro.js

反映方法:
1. zipを解凍します。
2. GitHubの katapata-site-test で Upload files を開きます。
3. 解凍した中の assets フォルダと tools フォルダをアップロードします。
4. Commit changes します。
5. Vercel反映後、原型作成ツールを確認します。

確認ポイント:
- サイト内のKATAPATAで鉛筆線アニメーションが出ない
- ENTERボタンが出ない
- KATAPATAロゴとタグラインが短く表示される
- 自動で寸法入力画面へ進む

注意:
これはサイト用の tools/sloper/app/katapata.html を置き換えるためのものです。
手元に残しておく1ファイル完結版の正本には入れないでください。
