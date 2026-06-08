KATAPATA本体のiPad縦表示幅調整

変更ファイル:
- assets/js/katapata-site-mini-intro.js

内容:
- iPadなどのタブレット縦表示で、KATAPATA本体のwrap/card/main/canvasを画面幅いっぱいに近づけるCSSを追加。
- 外側サイト用CSSではなく、KATAPATA本体内に読み込まれているサイト用JSからスタイルを追加する方式です。
- KATAPATA本体HTMLは上書きしません。

反映方法:
- assets フォルダをGitHubのUpload filesで上書き
- Commit changes
- iPadではキャッシュが残りやすいので、Vercel反映後に再読み込みしてください。
