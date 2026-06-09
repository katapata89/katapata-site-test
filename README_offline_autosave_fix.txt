KATAPATA offline/autosave fix update

Files:
- assets/js/katapata-site-mini-intro.js
- service-worker.js

Fixes:
1. cm/inch switch is moved into the sleeve-length / sleeve-cap area and made compact so it should not hide the "原型を作成" button.
2. The tablet right-side stage buttons remain removed; only the slim vertical rail remains.
3. Autosave is changed to safe mode:
   - It still saves input/select/textarea values locally.
   - Restore only restores input values.
   - It no longer auto-clicks stage buttons during restore.
   - It no longer saves on every click or shows a save toast on every save.
4. A tablet rail observer loop was reduced by not observing style changes and not rewriting the rail position if unchanged.
5. Service worker cache version was bumped to refresh the cached JS.

After upload:
- Upload assets and service-worker.js to GitHub and commit.
- On iPad, reload once or twice after Vercel deploy so the updated service worker replaces the old cached JS.
- If the old behavior persists, close the tab and open the site again.
