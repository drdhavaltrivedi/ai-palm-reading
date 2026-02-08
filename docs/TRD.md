# Technical Requirements Document: AI Palm Reading Mobile App

## 1. Tech Stack (Mandatory)

| Layer | Choice | Notes |
|-------|--------|--------|
| Framework | React Native (TypeScript) | Type safety, shared types with API. |
| Tooling | Expo (bare workflow when needed) | OTA, EAS Build, native modules via prebuild. |
| Navigation | React Navigation | Native stack + bottom tabs. |
| State | Zustand | Global client state (readings, onboarding, capture, paywall). |
| Server state | React Query | Analysis job, readings fetch, cache, retries. |
| Motion | Reanimated + Gesture Handler | 60fps capture UX, gestures. |
| Styling | NativeWind (Tailwind for RN) | Dark-first design system. |
| Camera | Expo Camera | Capture and preview. |
| Backend / AI | Interface only | REST abstraction; LLM and rule-engine adapters. |
| CV (conceptual) | MediaPipe Hands / OpenCV | Design-only; no implementation. |

---

## 2. Tech Stack Justification

- **Expo:** Enables EAS Build for Play Store, OTA updates, and managed native modules; bare workflow when custom native code is required.
- **Zustand vs Redux Toolkit:** Lighter bundle and simpler API for palm flow (onboarding, capture, readings, paywall); no need for Redux middleware for this scope.
- **React Query:** Handles server state (analyze, get reading), caching, and retries; keeps REST contract clear.
- **NativeWind:** Consistent dark-first tokens (colors, typography, spacing); fewer magic numbers in components.
- **Reanimated + Gesture Handler:** Smooth capture feedback and gestures; required for good camera UX.
- **TypeScript:** Shared types for API request/response and navigation params; fewer runtime errors.
- **REST + abstract LLM/rule-engine:** Backend-agnostic; swap providers or add queue later without changing app contracts.

---

## 3. Non-Functional Requirements

- **Performance:** Camera ready &lt; 2s where possible; analysis loading feels “ritualistic” (see UI/UX), not technical.
- **Security:** HTTPS only; no palm image or PII in client logs; API keys via env.
- **Offline:** Cached readings viewable offline; upload retry when back online (design; implementation later).
- **Accessibility:** Labels, contrast (WCAG AA), font scaling support.

---

## 4. API & AI Integration Design (Interface Only)

### 4.1 REST Abstraction
- **Endpoints (example):**
  - `POST /analyze` — body: `{ imageUri/base64, handSide, isDominant }`; response: `{ jobId }` or `{ readingId }` (sync).
  - `GET /readings/:id` — response: full reading (sections, narrative).
  - `GET /readings` — list user’s readings (when auth exists).
- **Auth:** JWT or session cookie; optional anonymous ID for first-time use.
- **Idempotency:** Optional idempotency key on `POST /analyze` for retries.

### 4.2 LLM Interface
- **Input:** Structured traits from rule engine (palm shape, lines, mounts).
- **Output:** Narrative per section (Core Personality, Emotional Style, Career, Relationships, Life Flow); schema in types.
- **Constraints:** Token/safety limits; no deterministic future claims (prompt contract in backend when built).

### 4.3 Rule-Engine Adapter
- **Input:** Palm feature vector (shape, major lines, mount prominence).
- **Output:** Structured traits (key-value or enum) for LLM.
- **Versioning:** Version field in request or config for interpretation rules.

No backend or AI implementation in this phase; only interfaces and contracts.

---

## 5. Edge Cases (Technical)

- **Image too large/dark/blurry:** Client compression and validation; server returns 4xx with code; client shows retake/guidance.
- **Network failure:** React Query retry; offline message; queue upload when implemented.
- **Rate limits:** 429 handling with backoff and user message.
- **Malformed API response:** Validate with types; fallback UI and “Something went wrong” + retry.
- **Hand not detected:** Server returns specific error; client shows “Couldn’t read palm” + retake.

---

## 6. Privacy & Compliance (Technical)

- Minimal data retention; encryption in transit (TLS) and at rest (backend responsibility).
- No logging of raw palm images in production.
- Consent flags stored client-side and sent with requests where needed.
- Endpoints for export/delete (GDPR/CCPA) when user accounts exist; design only.

---

## 7. Scalability (Technical)

- Stateless API design; horizontal scaling; CDN for static assets.
- Optional queue for analysis jobs (async job ID + poll or webhook).
- Feature flags and A/B hooks in app (e.g. feature-flag service or config); IAP/Stripe integration points only.

---

## 8. Build & Release

- **Build:** Expo with EAS Build; production Android builds: `eas build --platform android --profile production`.
- **Output:** AAB (Android App Bundle) for Play Store.
- **Versioning:** `version` (e.g. 1.0.0) and `android.versionCode` in app config; increment per upload.
- **Signing:** EAS-managed keystore or existing upload key; Play App Signing recommended.
- Full steps: see [BUILD_AND_PLAYSTORE.md](./BUILD_AND_PLAYSTORE.md).
