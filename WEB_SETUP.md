# Web App Setup & Debugging

## Run the web app (dev)

```bash
npm run web
```

Then open **http://localhost:8081** (or the port shown) in your browser.

## Run the web app (production build)

```bash
npm run build:web
npx serve dist -p 5000
```

`build:web` runs `scripts/patch-web-index.js` so that:
- The root/body layout fills the viewport (fixes black screen).
- A visible "Loading AI Palm Reading…" placeholder shows until React mounts.
- Any **uncaught JS error** or **unhandled promise rejection** is shown on the page (orange/red error box).
- After 5 seconds, if still on the loading text, the message suggests opening the console.

Use the port printed by `serve` (e.g. http://localhost:37135 if 5000 is in use).

## If the app doesn’t load

1. **Hard refresh**  
   `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac).

2. **Check for the error overlay**  
   If the script or React throws, you’ll see an "App error" or "Unhandled promise error" box with the message. Fix that error (e.g. missing `EXPO_PUBLIC_*` in `.env`).

3. **Check the console**  
   Open DevTools (F12) → **Console**. Look for red errors and fix them (e.g. failed fetch, missing env, CORS).

## Changes made for web

- **Root layout:** `global.css` and root `View` use `minHeight: 100vh` and `display: flex` so the app fills the viewport.
- **SafeAreaProvider:** Uses `initialWindowMetrics` so layout is correct on first paint.
- **Splash on web:** Uses a plain `View` instead of `ImageBackground` for more reliable rendering.
- **Error boundary:** Top-level `ErrorBoundary` shows any render error instead of a blank screen.
- **Theme:** `useColorScheme()` fallback so theme works when the system scheme is missing.

## Customize web index (optional)

To edit the HTML (e.g. add a loading message or analytics):

```bash
npx expo customize:web
```

Choose `web/index.html` (or the option shown). After editing, run `npm run build:web` again.
