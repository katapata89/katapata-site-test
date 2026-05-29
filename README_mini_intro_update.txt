KATAPATA サイト内本体用：ミニ導入化アップデート

この更新は、KATAPATA本体のHTML全体を置き換えません。
サイト内の KATAPATA にだけ、短いロゴ表示 → 自動で寸法入力画面へ、という挙動を追加します。

入っているファイル:
assets/js/katapata-site-mini-intro.js

反映手順:
1. このzipを解凍します。
2. assets フォルダを katapata-site-test の同じ場所へアップロードします。
3. GitHubで tools/sloper/app/katapata.html を開きます。
4. 画面右上の鉛筆アイコンで編集します。
5. </body> の直前に、下の1行を追加します。

<script src="../../../assets/js/katapata-site-mini-intro.js"></script>

6. Commit changes します。
7. Vercel反映後、原型作成ツールを開いて確認します。

確認ポイント:
- 鉛筆で線を引くアニメーションが出ない
- ENTERボタンが出ない
- KATAPATAロゴとタグラインが短く表示される
- その後、自動で寸法入力画面へ進む

元の1ファイル完結版には、このscriptタグを入れないでください。
入れるのはサイト用の tools/sloper/app/katapata.html だけです。
