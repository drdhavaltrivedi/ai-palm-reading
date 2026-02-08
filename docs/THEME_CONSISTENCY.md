# 🎨 Theme Consistency Guide

## ✅ All Screens Now Use Consistent Theme!

All screens in the app now use the **same color palette, typography, and styling**.

---

## 🎨 Color Palette

### Background Colors
```typescript
background:      "#0f172a"  // Slate 950 - Main app background
surface:         "#1e293b"  // Slate 800 - Cards, elevated surfaces
```

### Purple Theme (Primary)
```typescript
primary:         "#9333ea"  // Purple 600 - Buttons, CTAs, accents
primaryLight:    "#a78bfa"  // Purple 400 - Section titles, highlights
```

### Text Colors
```typescript
textPrimary:     "#ffffff"  // White - Main headings and titles
textSecondary:   "#cbd5e1"  // Slate 300 - Body text, descriptions
textMuted:       "#94a3b8"  // Slate 400 - Subtitles, hints
textDim:         "#64748b"  // Slate 500 - Very dim text, timestamps
```

### Border Colors
```typescript
border:          "#334155"  // Slate 700 - Card borders, dividers
borderLight:     "#475569"  // Slate 600 - Lighter borders
```

---

## 📱 Screens Updated

### ✅ HomeScreen
**Now Features**:
- Dark background (#0f172a)
- Purple CTA button (#9333ea)
- Card-based feature layout
- Consistent spacing and padding
- Hero section with icon
- "How it works" steps

**Design**:
- Main background: #0f172a
- Cards: #1e293b with #334155 borders
- Primary button: #9333ea
- Text hierarchy: White → Slate 300 → Slate 400

### ✅ CaptureScreen
- Dark overlay on camera
- Purple palm guide corners
- White text for instructions
- Purple capture button ring

### ✅ AnalysisLoadingScreen
- Dark background (#0f172a)
- Purple loading indicator (#9333ea)
- Purple step dots
- White title, slate subtitle

### ✅ ReadingScreen
- Dark background (#0f172a)
- Purple section titles (#a78bfa)
- Slate cards (#1e293b)
- Purple chat button (#9333ea)

### ✅ ChatScreen
- Dark background (#0f172a)
- User messages: Purple (#9333ea)
- AI messages: Slate (#1e293b)
- Input with purple send button

### ✅ HistoryScreen
- Dark background (#0f172a)
- Slate cards with thumbnails
- Purple accent for selected items
- White titles, slate descriptions

### ✅ ProfileScreen
- Dark background (#0f172a)
- Slate cards for stats
- Purple developer name
- Purple action icons

---

## 🎯 Design Principles

### 1. Dark Background Always
```typescript
backgroundColor: "#0f172a"  // Every screen
```

### 2. Cards Use Slate Surface
```typescript
backgroundColor: "#1e293b",
borderWidth: 1,
borderColor: "#334155",
borderRadius: 16,
```

### 3. Primary Actions Use Purple
```typescript
backgroundColor: "#9333ea",  // Buttons, CTAs
color: "#ffffff",            // Button text
```

### 4. Text Hierarchy
```typescript
// Titles
color: "#ffffff",
fontSize: 28-32,
fontWeight: "bold",

// Body text
color: "#cbd5e1",
fontSize: 14-16,

// Muted text
color: "#94a3b8",
fontSize: 12-14,
```

---

## 📐 Common Styles

### Container
```typescript
{
  flex: 1,
  backgroundColor: "#0f172a",
}
```

### Card
```typescript
{
  backgroundColor: "#1e293b",
  borderRadius: 16,
  padding: 16-20,
  borderWidth: 1,
  borderColor: "#334155",
}
```

### Primary Button
```typescript
{
  backgroundColor: "#9333ea",
  paddingVertical: 16,
  paddingHorizontal: 24,
  borderRadius: 12,
  alignItems: "center",
}
```

### Button Text
```typescript
{
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
}
```

---

## 🎨 Visual Consistency Checklist

All screens now have:
- ✅ Dark background (#0f172a)
- ✅ Slate cards (#1e293b) with borders (#334155)
- ✅ Purple primary actions (#9333ea)
- ✅ White main text (#ffffff)
- ✅ Slate secondary text (#cbd5e1, #94a3b8)
- ✅ Consistent spacing (16-24px padding)
- ✅ Same border radius (12-16px)
- ✅ Matching shadows (purple for CTAs)

---

## 📱 Screen-by-Screen Breakdown

### HomeScreen
```
┌─────────────────────────────┐
│ #0f172a Background          │
│                             │
│ "AI Palm Reading" (#fff)    │
│ Subtitle (#94a3b8)          │
│                             │
│ ┌───────────────────────┐   │
│ │  #1e293b Card         │   │
│ │  🔮 Hero Section      │   │
│ │  #fff title           │   │
│ └───────────────────────┘   │
│                             │
│ [#9333ea Scan Palm Button]  │
└─────────────────────────────┘
```

### Reading/History/Profile
```
┌─────────────────────────────┐
│ #0f172a Background          │
│                             │
│ #fff Title                  │
│ #94a3b8 Subtitle            │
│                             │
│ ┌───────────────────────┐   │
│ │  #1e293b Card         │   │
│ │  #a78bfa Section      │   │
│ │  #cbd5e1 Content      │   │
│ └───────────────────────┘   │
└─────────────────────────────┘
```

---

## 🔧 Theme File

**Location**: `src/app/theme/colors.ts`

This file exports all color constants:
```typescript
import colors from "@/app/theme/colors";

// Use in components:
backgroundColor: colors.background,
color: colors.textPrimary,
borderColor: colors.border,
```

---

## 🎯 Benefits

### For Users:
- ✅ Consistent experience across all screens
- ✅ Professional, cohesive design
- ✅ Easy to navigate (familiar patterns)
- ✅ Premium feel throughout

### For Development:
- ✅ Single source of truth for colors
- ✅ Easy to maintain
- ✅ Quick to update theme
- ✅ No color mismatches

---

## 📊 Before & After

### Before:
- ❌ Home used different colors
- ❌ Some screens used Tailwind classes
- ❌ Inconsistent purple shades
- ❌ Mixed background colors

### After:
- ✅ All screens use StyleSheet
- ✅ Exact same purple (#9333ea)
- ✅ Consistent dark bg (#0f172a)
- ✅ Unified visual language

---

## 🚀 Result

**Professional, cohesive app** with:
- Consistent purple and dark slate theme
- Same design patterns everywhere
- Visual harmony across all screens
- Premium, polished feel

**Every screen feels like part of the same app!** 🎨✨

---

**Theme**: Dark Purple Professional  
**Primary**: #9333ea (Purple 600)  
**Background**: #0f172a (Slate 950)  
**Cards**: #1e293b (Slate 800)  

All screens updated for perfect consistency! ✅
