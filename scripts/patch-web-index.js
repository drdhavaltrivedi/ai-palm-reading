#!/usr/bin/env node
/**
 * Patches dist/index.html after expo export -p web to fix black screen:
 * - Stronger root/body/html height and flex so the app fills the viewport
 * - Visible loading placeholder inside #root until React mounts
 */
const fs = require("fs");
const path = require("path");

const distIndex = path.join(__dirname, "..", "dist", "index.html");
if (!fs.existsSync(distIndex)) {
  console.warn("scripts/patch-web-index.js: dist/index.html not found, skipping patch");
  process.exit(0);
}

let html = fs.readFileSync(distIndex, "utf8");

const expoResetReplace = `    <style id="expo-reset">
      html, body { height: 100%; margin: 0; padding: 0; min-height: 100vh; }
      body { overflow: hidden; display: flex; flex-direction: column; }
      #root {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 100vh;
        height: 100%;
        width: 100%;
      }
    </style>`;

// Replace the default expo-reset block (match flexible)
html = html.replace(
  /<style id="expo-reset">[\s\S]*?<\/style>/,
  expoResetReplace
);

// Add visible loading placeholder inside #root (React will replace it when mounting)
html = html.replace(
  '<div id="root"></div>',
  `<div id="root"><div style="display:flex;flex:1;min-height:100vh;width:100%;align-items:center;justify-content:center;background:#0c0a09;color:#a8a29e;font-family:system-ui,sans-serif;font-size:14px;">Loading AI Palm Reading…</div></div>`
);

// Fix: Expo bundle uses import.meta → must load as ES module (fixes "Cannot use 'import.meta' outside a module")
html = html.replace(
  /<script\s+src="(\/_expo\/static\/js\/web\/[^"]+)"[^>]*><\/script>/,
  '<script type="module" src="$1"></script>'
);

// Inline script: show any JS error on the page so we can debug black screen
const errorScript = `
<script>
window.addEventListener('error', function(e) {
  var el = document.getElementById('root');
  if (!el) return;
  el.innerHTML = '<div style="padding:24px;max-width:560px;background:#1c1917;color:#fbbf24;font-family:system-ui,sans-serif;font-size:14px;border:1px solid #444;">' +
    '<strong style="color:#ef4444;">App error</strong><br><br>' +
    (e.message || '') + '<br><br>' +
    '<code style="font-size:12px;color:#94a3b8;word-break:break-all;">' + (e.filename || '') + ':' + (e.lineno || '') + '</code>' +
    '</div>';
});
window.addEventListener('unhandledrejection', function(e) {
  var el = document.getElementById('root');
  if (!el) return;
  el.innerHTML = '<div style="padding:24px;max-width:560px;background:#1c1917;color:#fbbf24;font-family:system-ui,sans-serif;font-size:14px;border:1px solid #444;">' +
    '<strong style="color:#ef4444;">Unhandled promise error</strong><br><br>' +
    (e.reason && (e.reason.message || String(e.reason))) + '</div>';
});
setTimeout(function() {
  var el = document.getElementById('root');
  if (!el || el.children.length !== 1) return;
  var first = el.firstElementChild;
  if (!first || !first.textContent || first.textContent.indexOf('Loading AI Palm Reading') === -1) return;
  first.innerHTML = 'Still loading? Open DevTools (F12) → Console and check for red errors.';
}, 5000);
</script>`;
// Insert before closing </body>
html = html.replace("</body>", errorScript + "\n</body>");

fs.writeFileSync(distIndex, html);
console.log("Patched dist/index.html for web root/layout fix.");
