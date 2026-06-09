KATAPATA restore measure screen safe update

Purpose:
- Remove the recent cm/inch proxy and measurement-panel manipulation patches.
- Remove the tablet rail / unit relocation experiments.
- Restore the stable site JS so that pressing 原型を作成 proceeds immediately.
- Keep the service worker in unregister/no-cache mode to avoid stale broken JS being reused.

Files:
- assets/js/katapata-site-mini-intro.js
- service-worker.js

Upload:
- Upload assets and service-worker.js to GitHub, then Commit changes.

After deploy:
- Reload strongly.
- On iPad/Safari, close the tab and reopen the test site.
- If the old broken behavior remains, clear website data for the test site or open in private mode once.

Next step:
- If cm/inch near the input and the measurement-panel scrollbar are still needed, implement them directly inside the latest katapata.html instead of injecting/moving form parts from an external JS file.
