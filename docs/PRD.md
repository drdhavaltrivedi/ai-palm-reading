# Product Requirements Document: AI Palm Reading Mobile App

## 1. Product Vision & Positioning

- **What it is:** A mobile app that analyzes a user’s palm photo and returns **interpretive insights** about personality and life tendencies—framed as self-reflection and guidance, not deterministic future prediction.
- **Positioning:** Premium, minimal, mystical-but-modern. Entertainment and self-discovery only.
- **Target users:** Astrology / palmistry-curious users, 18–45, mobile-first, global audience.
- **Non-negotiable:** The app does **not** claim guaranteed future prediction; all language is probabilistic and reflective.

---

## 2. User Personas & Jobs-to-Be-Done

| Persona | Description | Primary job |
|--------|-------------|-------------|
| **Curious Explorer** | Interested in astrology, personality tests, self-reflection. | “I want to see what my palm says about my traits and tendencies.” |
| **Social Sharer** | Enjoys sharing results with friends. | “I want a shareable, visually nice reading I can post or send.” |
| **Comparison User** | Has done readings before. | “I want to compare left vs right palm and revisit past readings.” |
| **Premium Considerer** | Willing to pay for deeper content. | “I want a deeper analysis or compatibility reading.” |

---

## 3. Feature Breakdown

### 3.1 Onboarding
- **Welcome screen:** Brand + mystic tone; sets expectations.
- **Disclaimer:** Clear statement that the app is for entertainment and self-reflection only (no guaranteed predictions).
- **Hand selection:** User chooses Left / Right hand and whether it’s their dominant hand.
- **Camera permission:** Explicit permission flow with rationale (needed for palm capture).

### 3.2 Palm Capture
- **Camera:** Full-screen camera with a palm outline overlay for alignment.
- **Real-time guidance:** Feedback on lighting, distance, and palm alignment (e.g. “Move closer”, “Improve lighting”).
- **Auto-crop + preview:** After capture, show cropped preview with option to retake.
- **Retake:** Always available before submitting.

### 3.3 Palm Analysis Pipeline
- **Client-side:** Image compression, secure upload, optional progress indicator.
- **Server-side (design only):** Palm detection → line extraction → feature classification (palm shape, major lines, mount prominence) → rule-based interpretation mapping → LLM-based narrative generation. No backend implementation in this phase; interfaces only.

### 3.4 Reading Output
- **Sections:** Core Personality, Emotional Style, Career Inclination, Relationship Tendencies, Life Flow (early / mid / later phases—probabilistic language).
- **UX:** Card-based scroll, subtle animations, shareable insights (image and/or text).
- **Tone:** Mystic but readable; no absolute future claims.

### 3.5 History & Profile
- **Saved readings:** List of past readings with date and hand; tap to view.
- **Compare:** Option to compare left vs right palm readings (side-by-side or toggle).
- **Optional profile:** Age, gender optional; used only to tailor language or segments if desired; not required.

### 3.6 Monetization (Hook-Ready)
- **Free tier:** Basic reading (core sections).
- **Premium (design only):** Deep analysis, compatibility reading, monthly insight refresh. Stripe / in-app purchase ready; no implementation in this phase.
- **Paywall:** Shown when user taps a premium feature; copy and pricing placeholder.

---

## 4. Success Metrics

| Metric | Description |
|--------|-------------|
| **Activation** | % of users who complete first reading (capture → reading viewed). |
| **Retention** | D1 / D7 return (e.g. open app again, view history). |
| **Premium conversion** | % of users who start checkout or complete purchase (when implemented). |
| **Share rate** | % of users who use the share action after a reading. |

---

## 5. Edge Cases (Product View)

| Scenario | Product decision |
|----------|------------------|
| Poor photo quality | Show guidance (lighting/distance/alignment); allow retake; if analysis fails, show friendly message and retake CTA. |
| Wrong hand | Allow user to re-select hand and retake; or add “Wrong hand?” in preview step. |
| Minors | Age gate at onboarding or in disclaimer (e.g. 13+ or 18+); no special content, just compliance. |
| Accessibility | Support system font scaling, sufficient contrast, and clear labels (see UI/UX guidelines). |
| Offline / errors | Cache past readings for offline view; on submit failure show retry and optional “Try again later.” |
| No camera permission | Explain why it’s needed; deep link to settings; block capture until granted. |

---

## 6. Privacy & Compliance (Product Requirements)

- **Consent:** Explicit consent for camera and for processing palm images (and any optional profile data).
- **Data usage:** Clear in-app explanation of what is collected and how it’s used (e.g. analysis, improving service); no future “prediction” claims in policy.
- **Age appropriateness:** Comply with store age ratings; disclaimer that content is for entertainment.
- **Rights:** Support data export and account/data deletion (GDPR/CCPA-ready) when user accounts exist.
- **Store compliance:** Health/wellness and “fortune-telling” policies: frame as entertainment and self-reflection only; disclaimer visible where required.

---

## 7. Scalability & Monetization (Product)

- **Free tier:** One or limited readings; basic sections only.
- **Premium:** Deep analysis, compatibility, monthly refresh; pricing model TBD; Stripe and in-app purchase integration points designed, not implemented.
- **Growth:** Feature flags and A/B hooks in design; no backend logic in this phase.
