# Expo Build & Play Store Publishing

## Scope

Build the app with **Expo (EAS Build)** and publish to **Google Play Store** (Android). This doc covers versioning, signing, and a Play Store checklist.

---

## 1. Expo Build Strategy

- **Tool:** EAS Build (Expo Application Services).
- **Command (production Android):**  
  `eas build --platform android --profile production`
- **Output for Play Store:** **AAB** (Android App Bundle). In `eas.json`, set the production profile to build an app bundle (default for Play Store).

### 1.1 Project Config (`app.json` / `app.config.js`)

- `expo.android.package` — Android applicationId (e.g. `com.yourapp.palmreading`).
- `expo.version` — User-facing version (e.g. `1.0.0`).
- `expo.android.versionCode` — Integer; **increment for every Play Store upload**.
- `expo.splash` / `expo.icon` — Splash and icon paths.
- `expo.userInterfaceStyle` — Prefer `"dark"` for dark-first app.

### 1.2 EAS Config (`eas.json`)

Example profiles:

- **development** — Debug or dev build (optional).
- **preview** — Internal testing; APK or AAB.
- **production** — Release AAB for Play Store.

Android-specific: use `"buildType": "app-bundle"` for production.

---

## 2. Versioning

| Field | Where | Rule |
|-------|--------|------|
| `version` | `app.json` → `expo.version` | User-visible (e.g. 1.0.0); semantic. |
| `versionCode` | `app.json` → `expo.android.versionCode` | Integer; must increase for each Play Store upload. |

Example: first release `1.0.0` / `1`; next update `1.0.1` / `2` or `1.1.0` / `2`.

---

## 3. Signing

- **EAS:** Use EAS to generate and store the Android keystore (recommended for simplicity). First run of `eas build` can create credentials.
- **Existing key:** If you have an upload key, configure EAS to use it (credentials in EAS or local).
- **Play App Signing:** Prefer **Google Play App Signing**. You upload an upload key; Google holds the app signing key. Reduces risk of key loss and enables optimizations.

---

## 4. Play Store Publishing Checklist (Documentation)

Complete these in Google Play Console; no store copy or assets are produced in this repo.

1. **Create app** in Play Console; choose default language and title.
2. **Store listing:** Short description, full description, graphics placeholder (feature graphic, screenshots). Ensure disclaimer for entertainment/self-reflection is reflected in description where required.
3. **Content rating:** Complete questionnaire; app is entertainment, not medical/fortune-telling as guaranteed prediction.
4. **Target audience:** Set age group (e.g. 18+ or as per policy).
5. **Privacy policy:** Host a URL; link in Console. Policy must cover camera, optional account, and data use (see PRD/TRD).
6. **Data safety:** Declare camera usage, optional account data; no selling of personal data if not applicable.
7. **Testing:** Use internal → closed → open testing as needed; then promote to production.
8. **First release:** Upload AAB from EAS Build; complete release form and roll out.
9. **Updates:** Bump `versionCode` (and optionally `version`); build new AAB; upload to a new release.

---

## 5. CI (Optional)

- **Local:** Run `eas build --platform android --profile production` from project root (after `eas login` and project link).
- **CI (e.g. GitHub Actions):** Use `eas build` in a workflow; store EAS credentials as secrets. Trigger on tag or main branch for reproducible releases.
