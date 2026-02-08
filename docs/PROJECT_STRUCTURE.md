# Project Structure & Folder Responsibilities

## Directory Tree

```
src/
├── app/
│   ├── navigation/    # Route definitions, stack/tab config, deep links, auth gates
│   ├── screens/        # One folder or file per screen; screen-level layout and wiring
│   ├── components/     # Reusable UI (buttons, cards, capture overlay, loading)
│   ├── hooks/          # useCamera, useAnalysis, useAuth, usePaywall, etc.
│   ├── store/          # Zustand slices: user, readings, capture, paywall
│   ├── services/       # API client, camera service, storage
│   ├── utils/          # Image compression, validation, formatters, constants
│   └── theme/          # NativeWind/design tokens: colors, typography, spacing
├── assets/             # Fonts, images, icons, splash (or root /assets)
└── types/              # Shared TS types and API/domain models
```

---

## Folder Responsibilities

| Folder | Responsibility |
|--------|----------------|
| **app/navigation/** | Define all routes (screens and params). Configure root stack (splash, onboarding), main stack/tabs (Home, History, Profile), and nested stacks (Capture → Loading → Reading). Handle deep links and auth-based redirects. |
| **app/screens/** | Screen containers only. Each screen: layout, local UI state, wiring to store/hooks/services. No business logic; thin presenters. |
| **app/components/** | Reusable, presentational or composite components: buttons, cards, palm overlay, analysis loader, reading cards, share sheet. Shared across screens. |
| **app/hooks/** | Encapsulate side effects and reusable state: camera lifecycle and permissions, analysis submit/poll, auth, paywall check, form state. Keep screens simple. |
| **app/store/** | Global client state: user session, onboarding completion, readings list, current capture/analysis state, premium status. Persist where needed (e.g. readings, onboarding). |
| **app/services/** | External I/O: REST API client (analyze, readings, user), camera wrapper, secure storage, optional analytics. Pure interfaces; no UI. |
| **app/utils/** | Pure helpers: image compression, validation (hand side, image size), date/string formatters, constants (API base URL, feature flags). |
| **app/theme/** | Design system: colors, typography (serif/sans), spacing, radii. NativeWind config and token usage. Single source for dark-first theme. |
| **assets/** | Static assets: fonts (serif/sans), images (splash, onboarding), icons. Referenced by theme and components. |
| **types/** | Shared TypeScript types: API request/response (analysis, reading), domain (reading section, hand side), navigation params. Used by services, store, and screens. |
