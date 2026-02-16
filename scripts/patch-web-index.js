#!/usr/bin/env node
/**
 * Patches dist/index.html after expo export -p web:
 * - SEO & GEO meta tags, Open Graph, Twitter Card, JSON-LD
 * - Root layout and loading placeholder
 * - type="module" for main script
 */
const fs = require("fs");
const path = require("path");

// SEO & GEO – set SITE_URL to your production URL (used for canonical, OG, JSON-LD)
const SITE_URL = process.env.SITE_URL || "https://palmistry.appstream.me";
const SEO = {
  title: "AI Palm Reading – Free Palm Reading Online",
  description: "Get AI-powered palm reading insights. Analyze palm lines, mounts, and fingers with Gemini AI. Free palm reading app for life, love, and career.",
  keywords: "palm reading, palmistry, AI palm reading, free palm reading, palm lines, hand reading, life line, love line, career palm, Gemini AI, online palm reading",
  author: "AI Palm Reading",
  ogImage: `${SITE_URL}/favicon.ico`,
  geoRegion: "US",
  geoPlacename: "United States",
};

const distIndex = path.join(__dirname, "..", "dist", "index.html");
if (!fs.existsSync(distIndex)) {
  console.warn("scripts/patch-web-index.js: dist/index.html not found, skipping patch");
  process.exit(0);
}

let html = fs.readFileSync(distIndex, "utf8");

// Inject SEO & GEO meta tags right after <head>
const seoBlock = `
  <!-- SEO -->
  <meta name="description" content="${escapeHtml(SEO.description)}">
  <meta name="keywords" content="${escapeHtml(SEO.keywords)}">
  <meta name="author" content="${escapeHtml(SEO.author)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${SITE_URL}/">
  <meta name="theme-color" content="#0c0a09">
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/">
  <meta property="og:title" content="${escapeHtml(SEO.title)}">
  <meta property="og:description" content="${escapeHtml(SEO.description)}">
  <meta property="og:image" content="${SEO.ogImage}">
  <meta property="og:site_name" content="${escapeHtml(SEO.author)}">
  <meta property="og:locale" content="en_US">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(SEO.title)}">
  <meta name="twitter:description" content="${escapeHtml(SEO.description)}">
  <meta name="twitter:image" content="${SEO.ogImage}">
  <!-- GEO -->
  <meta name="geo.region" content="${SEO.geoRegion}">
  <meta name="geo.placename" content="${escapeHtml(SEO.geoPlacename)}">
  <!-- JSON-LD (WebApplication for rich results) -->
  <script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Palm Reading",
    "description": SEO.description,
    "url": SITE_URL,
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  })}</script>
`;
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
html = html.replace(/<head[^>]*>/, "$&" + seoBlock);
// Ensure title matches SEO
html = html.replace(/<title>[^<]*<\/title>/, "<title>" + escapeHtml(SEO.title) + "</title>");

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

// Inline script: show errors and "network error" when app fails to load (e.g. script 404/CORS)
const networkErrorHtml = "<div style=\"display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:24px;background:#0c0a09;color:#d6d3d1;font-family:system-ui,sans-serif;text-align:center;\">" +
  "<p style=\"font-size:18px;margin-bottom:8px;\">A network error occurred.</p>" +
  "<p style=\"font-size:14px;color:#a8a29e;margin-bottom:20px;\">The app could not load. Check your connection and try again.</p>" +
  "<button onclick=\"location.reload()\" style=\"padding:12px 24px;background:#d16d08;color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;\">Retry</button>" +
  "</div>";
const errorScript = `
<script>
function showNetworkError(){var r=document.getElementById("root");if(r)r.innerHTML=${JSON.stringify(networkErrorHtml)};}
window.addEventListener("error",function(e){
  if(e.target&&(e.target.tagName==="SCRIPT"||(e.target.tagName==="LINK"&&e.target.rel==="modulepreload"))){showNetworkError();return;}
  var el=document.getElementById("root");if(!el)return;
  el.innerHTML="<div style=\\"padding:24px;max-width:560px;background:#1c1917;color:#fbbf24;font-family:system-ui,sans-serif;font-size:14px;border:1px solid #444\\">"+
    "<strong style=\\"color:#ef4444\\">App error</strong><br><br>"+(e.message||"")+"<br><br>"+
    "<code style=\\"font-size:12px;color:#94a3b8;word-break:break-all\\">"+(e.filename||"")+":"+(e.lineno||"")+"</code></div>";
});
window.addEventListener("unhandledrejection",function(e){
  var el=document.getElementById("root");if(!el)return;
  el.innerHTML="<div style=\\"padding:24px;max-width:560px;background:#1c1917;color:#fbbf24;font-family:system-ui,sans-serif;font-size:14px;border:1px solid #444\\">"+
    "<strong style=\\"color:#ef4444\\">Unhandled promise error</strong><br><br>"+(e.reason&&(e.reason.message||String(e.reason)))+"</div>";
});
setTimeout(function(){
  var el=document.getElementById("root");if(!el||el.children.length!==1)return;
  var first=el.firstElementChild;if(!first||first.textContent.indexOf("Loading AI Palm Reading")===-1)return;
  el.innerHTML=${JSON.stringify(networkErrorHtml)};
},8000);
</script>`;
// Insert before closing </body>
html = html.replace("</body>", errorScript + "\n</body>");

fs.writeFileSync(distIndex, html);
console.log("Patched dist/index.html (SEO, layout, type=module).");
