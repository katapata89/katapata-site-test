KATAPATA ミニ導入 修正版（本体ロゴのみ）

前回版では、元のKATAPATAロゴのあとにサイト用の簡易ロゴ表示が重なってしまいました。
この修正版では、簡易ロゴ表示を完全にやめて、KATAPATA本体にもともと入っている openingLogo / openingLetter だけを使います。

入っているファイル:
- assets/js/katapata-site-mini-intro.js

反映方法:
1. zipを解凍します。
2. GitHubの katapata-site-test で Upload files を開きます。
3. 解凍した assets フォルダをアップロードします。
4. Commit changes します。
5. Vercel反映後、ブラウザを強めに再読み込みして確認します。
   - Windows: Ctrl + F5

確認ポイント:
- 簡易版ロゴが出ない
- KATAPATA本体の元のロゴだけが短く表示される
- 鉛筆線アニメーションとENTERボタンは出ない
- 自動で寸法入力画面へ進む

※ tools/sloper/app/katapata.html は今回は含めていません。すでにscriptタグが入っている前提で、JSだけを差し替えます。
