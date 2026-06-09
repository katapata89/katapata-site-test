KATAPATA offline / autosave update

変更内容
- service-worker.js を追加し、一度オンラインで開いた主要ページとKATAPATA本体をキャッシュします。
- offline.html を追加しました。
- manifest.webmanifest を追加しました。
- assets/js/katapata-site-mini-intro.js に、Service Worker登録と自動保存・復元の保険処理を追加しました。

アップロードするもの
- assets
- service-worker.js
- offline.html
- manifest.webmanifest

確認方法
1. GitHubに上書きしてCommit changes
2. Vercel反映後、オンラインでKATAPATA本体を一度開く
3. 寸法を少し入力する
4. 再読み込みすると「前回の作業データがあります。復元しますか？」が出るか確認
5. iPad/PCでネットを切って、KATAPATA本体が開けるか確認

注意
- 初回アクセスはオンラインが必要です。
- Stripe購入ページ・決済処理はオンライン必須です。
- ブラウザのサイトデータを削除すると、自動保存データも消えます。
- 外部CDNのファイルがある場合、そのファイルはオフラインで読めない可能性があります。KATAPATA本体に必要なものは同じサイト内に置くのが安全です。
