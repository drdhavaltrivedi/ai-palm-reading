# UI/UX Guidelines: AI Palm Reading Mobile App

## 1. Visual Design

- **Dark-first:** Default to dark backgrounds (#0a0a0f, #12121a); avoid bright colors.
- **Gradients:** Soft, subtle gradients for depth (e.g. surface cards); no neon or harsh transitions.
- **Clutter:** Minimal; generous whitespace; one primary CTA per screen where possible.
- **Typography:**
  - **Headings:** Serif (mystic tone).
  - **Body:** Sans-serif (readability).
- **Hierarchy:** Clear heading levels and spacing; card elevation via border or subtle shadow.

---

## 2. Components

- **Buttons:** Primary (accent color), secondary (outline), text-only; consistent padding and touch targets (min 44pt).
- **Cards:** Rounded corners, border or soft shadow; padding for content.
- **Inputs:** Minimal; labels above or floating; error state clear.
- **Overlays:** Capture screen palm outline; semi-transparent guidance text.
- **Loading:** Ritualistic (e.g. gentle animation, short copy like “Reading your palm…”); avoid technical jargon or raw spinners only.
- **Empty states:** Illustration or icon + short copy + CTA (e.g. “No readings yet — capture your palm”).

---

## 3. Motion

- **Micro-interactions:** Capture success (brief checkmark or glow); analysis loading (subtle pulse or progress); card reveal (stagger or fade).
- **Duration:** 200–400ms for taps; 300–500ms for transitions.
- **Easing:** Ease-out for entrances; ease-in-out for state changes.
- **Reduced motion:** Respect system “reduce motion”; avoid auto-playing loops when disabled.

---

## 4. Responsiveness

- **Layout:** Flex-based; no hardcoded widths/heights for key containers; use % or flex.
- **Safe area:** Respect SafeAreaView for notches and system UI.
- **Breakpoints:** Phone (default) and tablet (e.g. max width for content, side-by-side where useful).
- **Font scaling:** Support dynamic type / accessibility font scaling.
- **Lists:** ScrollView or FlatList; card width responsive (e.g. min/max with padding).

---

## 5. Accessibility

- **Contrast:** WCAG AA (e.g. 4.5:1 for body text on background).
- **Touch targets:** Minimum 44×44 pt.
- **Labels:** All interactive elements have accessible labels; images have alt or role.
- **Order:** Logical focus/screen reader order.
- **Font scaling:** Text scales with system setting.

---

## 6. Copy & Tone

- **Mystic but clear:** Evocative but understandable; avoid jargon.
- **Disclaimer:** Visible at onboarding and where required (entertainment, self-reflection, no guaranteed prediction).
- **Life Flow:** Probabilistic language (“tendencies”, “may”, “often”); never “will happen”.
- **CTAs:** Action-oriented (e.g. “See my reading”, “Capture palm”, “Retake”).
