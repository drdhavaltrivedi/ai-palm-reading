# 🔢 Automatic Build Version Management

## ✅ Setup Complete!

Your app now has **automatic build version incrementing** configured!

---

## 📋 How It Works

### Version Numbers Explained

**Three types of version numbers**:

1. **App Version** (`version`): User-facing (e.g., "1.0.0")
   - Shown in app stores
   - Manual update recommended
   - Format: MAJOR.MINOR.PATCH

2. **iOS Build Number** (`buildNumber`): Internal build counter
   - Auto-increments with each iOS build
   - Must be unique for App Store
   - Starts at: 1

3. **Android Version Code** (`versionCode`): Internal build counter
   - Auto-increments with each Android build
   - Must increase for Play Store
   - Starts at: 1

---

## 🚀 Auto-Increment Configuration

### ✅ EAS.json Configuration
**File**: `eas.json`

All build profiles now have `"autoIncrement": true`:

```json
{
  "build": {
    "development": {
      "autoIncrement": true  ✅
    },
    "preview": {
      "autoIncrement": true  ✅
    },
    "production": {
      "autoIncrement": true  ✅
    }
  }
}
```

**What this does**:
- ✅ **iOS**: `buildNumber` auto-increments (1 → 2 → 3...)
- ✅ **Android**: `versionCode` auto-increments (1 → 2 → 3...)
- ✅ Happens automatically on each `eas build` command
- ✅ Stored in EAS cloud (no manual tracking needed)

---

### ✅ App Configuration
**File**: `app.config.js` (converted from app.json)

```javascript
{
  version: "1.0.0",           // User-facing version
  ios: {
    buildNumber: "1",         // Auto-incremented by EAS
  },
  android: {
    versionCode: 1,           // Auto-incremented by EAS
  }
}
```

**Why app.config.js?**
- More flexible than JSON
- Can use environment variables
- Supports dynamic configuration
- Required for some EAS features

---

## 🛠️ Build Commands

### Quick Build Scripts (npm)

All added to `package.json`:

```bash
# Android builds
npm run build:android:preview      # Preview APK
npm run build:android:production   # Production AAB

# iOS builds  
npm run build:ios:preview          # Preview build
npm run build:ios:production       # Production build

# Build both platforms
npm run build:all:production       # iOS + Android
```

### Direct EAS Commands

```bash
# Preview builds (testing)
eas build --platform android --profile preview
eas build --platform ios --profile preview

# Production builds (store submission)
eas build --platform android --profile production
eas build --platform ios --profile production

# Build both platforms at once
eas build --platform all --profile production
```

---

## 📊 Version History Example

### First Build:
```
App Version: 1.0.0
iOS Build: 1
Android Version Code: 1
```

### Second Build (after fixes):
```
App Version: 1.0.0          (same - no new features)
iOS Build: 2                ✅ Auto-incremented
Android Version Code: 2     ✅ Auto-incremented
```

### Third Build (minor update):
```
App Version: 1.0.1          (manually updated for bug fix)
iOS Build: 3                ✅ Auto-incremented
Android Version Code: 3     ✅ Auto-incremented
```

### Major Release:
```
App Version: 2.0.0          (manually updated for major release)
iOS Build: 4                ✅ Auto-incremented
Android Version Code: 4     ✅ Auto-incremented
```

---

## 🎯 When to Update What

### Update App Version (Manual)

**When**:
- New features added → 1.0.0 → 1.1.0
- Bug fixes → 1.0.0 → 1.0.1
- Major release → 1.0.0 → 2.0.0

**How**:
```javascript
// app.config.js
version: "1.1.0"  // Update this manually
```

**Versioning Guide**:
- `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking changes (1.0.0 → 2.0.0)
- **MINOR**: New features (1.0.0 → 1.1.0)
- **PATCH**: Bug fixes (1.0.0 → 1.0.1)

### Build Numbers (Automatic) ✅

**When**: Every build (automatic!)
- No manual update needed
- EAS handles it automatically
- Increments by 1 each build

---

## 🔄 Build Workflow

### Standard Build Process:

1. **Make code changes**
   ```bash
   # Your development work
   ```

2. **Update app version IF needed**
   ```javascript
   // app.config.js
   version: "1.1.0"  // Only if releasing new version
   ```

3. **Run EAS build**
   ```bash
   npm run build:android:production
   ```

4. **EAS automatically**:
   - ✅ Increments `versionCode` (Android)
   - ✅ Increments `buildNumber` (iOS)
   - ✅ Builds the app
   - ✅ Stores version history

5. **Submit to stores**
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

**No manual version tracking needed!** 🎉

---

## 📱 Store Submission Requirements

### Google Play Store (Android)
- **Required**: `versionCode` must increase ✅ Auto-handled
- **Required**: `version` (display version)
- Each update must have higher `versionCode`

### Apple App Store (iOS)
- **Required**: `buildNumber` must increase ✅ Auto-handled
- **Required**: `version` (display version)
- Each update must have higher `buildNumber`

**Both are now automatic!** No more rejected builds due to version conflicts! 🎊

---

## 🆕 First Time Setup

If you haven't used EAS before:

```bash
# 1. Install EAS CLI globally
npm install -g eas-cli

# 2. Login to Expo account
eas login

# 3. Initialize EAS in project
eas init

# 4. Configure credentials (for first build)
eas build:configure

# 5. Build! (version will auto-increment)
npm run build:android:production
```

---

## ✅ Benefits

### What You Get:
- ✅ **No manual tracking** - EAS remembers for you
- ✅ **No conflicts** - Can't submit duplicate versions
- ✅ **No mistakes** - Computer counts better than humans
- ✅ **Cloud storage** - Version history in EAS
- ✅ **Team friendly** - Same system for all developers
- ✅ **Store compliant** - Meets App Store & Play Store requirements

### What You Do:
- ✅ Just run `eas build`
- ✅ Update app `version` when releasing features
- ✅ Everything else is automatic!

---

## 🔍 Checking Current Versions

### View in EAS:
```bash
# See build history with versions
eas build:list
```

### View locally:
```bash
# Check current config
cat app.config.js | grep version
```

### In app stores:
- App Store Connect (iOS)
- Google Play Console (Android)

---

## 💡 Pro Tips

### Tip 1: Semantic Versioning
Follow semantic versioning for app `version`:
- **1.0.0** → First release
- **1.0.1** → Bug fix
- **1.1.0** → New feature
- **2.0.0** → Major change

### Tip 2: Build Notes
Add build notes when building:
```bash
eas build --platform android --profile production --message "Fixed palm analysis"
```

### Tip 3: Preview First
Always test with preview builds before production:
```bash
npm run build:android:preview
# Test it
npm run build:android:production
```

### Tip 4: Version Sync
Keep app `version` synced in:
- `app.config.js`
- `package.json`
- Release notes

---

## 📚 Files Modified

✅ **Created/Updated**:
- `app.config.js` - Converted from app.json with build numbers
- `eas.json` - Added `autoIncrement: true`
- `package.json` - Added build scripts

✅ **Configuration**:
- iOS build number: Auto-increment enabled
- Android version code: Auto-increment enabled
- All build profiles: Auto-increment enabled

---

## 🎉 Summary

**Before**:
- ❌ Manual version tracking
- ❌ Risk of conflicts
- ❌ Easy to forget to increment

**After**:
- ✅ Automatic version increment
- ✅ No conflicts possible
- ✅ Just build and forget!

**Simply run**:
```bash
npm run build:android:production
```

**And watch the magic happen**:
- Build: 1 → 2 → 3 → 4... ✨
- Automatically!
- Every time!
- Forever!

---

**Your builds now auto-increment!** 🚀

Never worry about version numbers again! 🎊
