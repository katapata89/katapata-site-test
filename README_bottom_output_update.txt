KATAPATA bottom PDF aggregation update

変更内容:
- ボトムス画面内のPDF出力ボタンを非表示にし、案内だけ表示します。
- 最後の「出力」画面に「ボトムスPDF」パネルを追加します。
- ボトムスの縮小サンプルPDF、通常サイズPDF、A4分割印刷PDFを出力画面に集約します。
- KATAPATA本体HTMLは上書きしません。assets/js/katapata-site-mini-intro.js のみ差し替えます。

反映方法:
1. zipを解凍
2. GitHubのUpload filesで assets フォルダを上書き
3. Commit changes
4. Vercel反映後、Ctrl+F5で確認
