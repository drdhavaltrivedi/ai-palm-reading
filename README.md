# 🔮 AI Palm Reading App

<div align="center">

![AI Palm Reading](https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge)
![React Native](https://img.shields.io/badge/React_Native-0.78-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-52-black?style=for-the-badge&logo=expo)
![Gemini AI](https://img.shields.io/badge/Gemini_3_Pro-AI-orange?style=for-the-badge)

**An intelligent palm reading application powered by Google's Gemini 3 Pro AI**

Capture your palm, receive detailed AI-powered readings, and chat with AI about your palmistry insights.

[Features](#-features) •
[Screenshots](#-screenshots) •
[Installation](#-installation) •
[Usage](#-usage) •
[Architecture](#-architecture)

</div>

---

## ✨ Features

### 🤖 **AI-Powered Analysis**
- **Gemini 3 Pro AI**: State-of-the-art vision model for accurate palm analysis
- **Comprehensive Readings**: Detailed analysis of life lines, heart lines, head lines, fate lines, palm mounts, fingers, and hand shapes
- **Multi-Section Insights**: Organized readings covering 7+ aspects of palmistry

### 📸 **Smart Palm Capture**
- **Guided Camera Interface**: Visual palm guide overlay for optimal photo capture
- **Hand Selection**: Choose left/right hand and dominant/non-dominant
- **Real-time Preview**: See your palm before capture
- **Professional Guidance**: On-screen tips for best results

### 💬 **Interactive AI Chat**
- **Contextual Conversations**: Ask questions about your specific palm reading
- **Full Context Awareness**: AI remembers your palm image and analysis
- **Suggested Questions**: Pre-populated palmistry questions to get started
- **Real-time Responses**: Instant AI-powered answers

### 📚 **Reading History**
- **Local Storage**: All readings saved securely on your device
- **Thumbnail Previews**: Visual history with palm image thumbnails
- **One-Tap Access**: Quickly review past readings
- **Delete Management**: Remove readings you no longer need

### 👤 **Profile & Settings**
- **Reading Statistics**: Track total palm readings
- **Dark Mode**: Premium dark theme (always-on)
- **Data Management**: Clear all data with one tap
- **Privacy Options**: Manage notifications and preferences

### 🎨 **Premium UI/UX**
- **Dark Purple Theme**: Professional, mystical aesthetic
- **Smooth Animations**: Polished transitions and interactions
- **Responsive Design**: Optimized for all mobile screen sizes
- **Consistent Design System**: Unified visual language throughout

---

## 📱 Screenshots

### Core Screens
| Home | Capture | Reading | Chat |
|------|---------|---------|------|
| Professional home with features | Guided palm capture | Detailed AI analysis | Interactive Q&A |

### Additional Screens
| History | Profile | Onboarding |
|---------|---------|------------|
| Reading thumbnails | Stats & settings | Smooth first-time experience |

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Expo CLI** (will be installed automatically)
- **iOS Simulator** / **Android Emulator** / **Physical device**
- **Gemini API key** (free from Google AI Studio)

### Step 1: Clone Repository
```bash
git clone https://github.com/drdhavaltrivedi/ai-palm-reading.git
cd ai-palm-reading
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy your API key

### Step 4: Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
EXPO_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here
```

### Step 5: Run the App

#### Development Mode (Recommended)
```bash
npm start
```

Then:
- **iOS**: Press `i` or scan QR with Camera app
- **Android**: Press `a` or scan QR with Expo Go
- **Web**: Press `w` (limited camera support)

#### Platform-Specific
```bash
npm run ios       # Run on iOS simulator
npm run android   # Run on Android emulator
npm run web       # Run in browser
```

### Step 6: Grant Permissions
When prompted, grant **camera permission** to capture palm photos.

---

## 📖 Usage Guide

### 📸 Capturing Your First Palm Reading

1. **Open the app** and tap **"Scan Your Palm"** on the home screen
2. **Grant camera permission** when prompted
3. **Position your palm** within the purple guide overlay
   - Spread fingers slightly
   - Ensure good lighting
   - Keep palm flat and steady
4. **Tap the capture button** (large circle at bottom)
5. **Select hand type**:
   - Left or Right
   - Dominant (hand you write with) or Non-dominant
6. **Wait for AI analysis** (~10-15 seconds)
7. **View your detailed reading**

### 💬 Chatting About Your Reading

1. On the reading screen, tap **"Ask Questions About Your Reading"**
2. Choose from **suggested questions** or type your own
3. Get **personalized AI responses** based on your specific palm
4. Continue the conversation with follow-up questions
5. Chat history is saved with your reading

### 📚 Viewing Reading History

1. Tap **History** tab at the bottom
2. See all your past readings with thumbnails
3. Tap any reading to view full details
4. Swipe to delete unwanted readings

### 👤 Managing Your Profile

1. Tap **Profile** tab at the bottom
2. View reading statistics
3. Toggle notification settings
4. Clear all data if needed
5. View privacy policy and support

---

## 🏗️ Architecture

### 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo** | Development platform and build tools |
| **TypeScript** | Type-safe JavaScript |
| **React Navigation** | Screen navigation (Stack & Tabs) |
| **Gemini 3 Pro AI** | AI vision and chat capabilities |
| **Zustand** | Lightweight state management |
| **AsyncStorage** | Local data persistence |
| **Expo Camera** | Camera access and capture |
| **Expo File System** | Image file management |

### 📂 Project Structure

```
ai-palm-reading/
├── src/
│   ├── app/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── ...
│   │   ├── navigation/           # Navigation configuration
│   │   │   ├── MainTabs.tsx      # Bottom tab navigator
│   │   │   ├── HomeStack.tsx     # Home screen stack
│   │   │   └── ...
│   │   ├── screens/              # App screens
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── CaptureScreen.tsx
│   │   │   ├── AnalysisLoadingScreen.tsx
│   │   │   ├── ReadingScreen.tsx
│   │   │   ├── ReadingDetailScreen.tsx
│   │   │   ├── ChatScreen.tsx
│   │   │   ├── HistoryScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   ├── services/             # API & AI services
│   │   │   ├── gemini.ts         # Gemini AI integration
│   │   │   └── api.ts            # Reading storage & retrieval
│   │   ├── store/                # Global state management
│   │   │   ├── index.ts
│   │   │   └── readingsStore.ts
│   │   ├── theme/                # Design system
│   │   │   └── colors.ts
│   │   └── utils/                # Helper functions
│   └── types/                    # TypeScript definitions
│       ├── index.ts
│       └── navigation.ts
├── assets/                       # App assets
│   ├── icon.png                  # App icon
│   ├── adaptive-icon.png         # Android adaptive icon
│   ├── splash.png                # Splash screen
│   └── favicon.png               # Web favicon
├── public/                       # Web public files
│   └── privacy.html              # Privacy policy page
├── docs/                         # Documentation
│   ├── BRANDING.md
│   ├── THEME_CONSISTENCY.md
│   ├── HISTORY_PROFILE.md
│   └── VERSION_MANAGEMENT.md
├── app.config.js                 # Expo configuration
├── eas.json                      # EAS Build configuration
├── package.json
├── tsconfig.json
├── .env.example                  # Environment template
└── README.md                      # This file
```

### 🔌 Key Services

#### Gemini Service (`src/app/services/gemini.ts`)

```typescript
// Analyze palm image
analyzePalmImage(imageUri, handSide, isDominant): Promise<PalmReading>

// Chat class for conversations
PalmReadingChat {
  initialize(imageUri, reading): void
  sendMessage(message): Promise<string>
  getSuggestedQuestions(): string[]
}

// Quick insights
getQuickPalmInsights(imageUri): Promise<string>
```

#### API Service (`src/app/services/api.ts`)

```typescript
// Submit palm for analysis
submitAnalysis(request): Promise<PalmReading>

// Get specific reading
getReading(readingId): Promise<PalmReading>

// Get all readings
getReadingsList(): Promise<PalmReading[]>

// Delete a reading
deleteReading(readingId): Promise<void>
```

---

## 🎨 UI/UX Design System

### 🎯 Design Philosophy

**Professional Mysticism**: Balancing trustworthy design with mystical aesthetics
- **Modern & Clean**: Contemporary UI patterns
- **Premium Feel**: High-quality visuals and animations
- **Mystical Touch**: Purple accents, glowing effects, subtle mysticism
- **User-Focused**: Intuitive navigation and clear hierarchy

### 🌈 Color Palette

#### Primary Colors
```css
Background:     #0f172a  /* Slate 950 - Main app background */
Surface:        #1e293b  /* Slate 800 - Cards, elevated surfaces */
Primary:        #9333ea  /* Purple 600 - Actions, CTAs, accents */
Primary Light:  #a78bfa  /* Purple 400 - Section titles, highlights */
```

#### Text Colors
```css
Text Primary:   #ffffff  /* White - Main headings and titles */
Text Secondary: #cbd5e1  /* Slate 300 - Body text, descriptions */
Text Muted:     #94a3b8  /* Slate 400 - Subtitles, hints */
Text Dim:       #64748b  /* Slate 500 - Very dim text, timestamps */
```

#### Functional Colors
```css
Border:         #334155  /* Slate 700 - Card borders, dividers */
Success:        #10b981  /* Green 500 - Success states */
Error:          #ef4444  /* Red 500 - Error states */
Warning:        #f59e0b  /* Amber 500 - Warning states */
```

### 📐 Typography

#### Font Sizes
- **Display**: 32-36px (App title, main headers)
- **Title**: 24-28px (Screen titles)
- **Heading**: 18-20px (Section headings)
- **Body**: 15-16px (Main content)
- **Caption**: 13-14px (Metadata, labels)
- **Small**: 11-12px (Fine print, badges)

#### Font Weights
- **Bold** (700): Headings, CTAs, emphasis
- **Semibold** (600): Subheadings, labels
- **Medium** (500): Body emphasis
- **Regular** (400): Body text

### 🔲 Layout & Spacing

#### Spacing Scale
```
xs:   4px   - Icon padding
sm:   8px   - Tight spacing
md:   12px  - Medium spacing
base: 16px  - Standard spacing
lg:   20px  - Section spacing
xl:   24px  - Screen padding
2xl:  32px  - Large gaps
```

#### Border Radius
```
Small:  8px   - Badges, tags
Base:   12px  - Buttons
Medium: 14px  - Inputs
Large:  16px  - Cards
XL:     20px  - Hero elements
```

### 🎭 Component Styles

#### Cards
```typescript
{
  backgroundColor: '#1e293b',
  borderRadius: 16,
  padding: 16-20,
  borderWidth: 1,
  borderColor: '#334155',
}
```

#### Primary Buttons
```typescript
{
  backgroundColor: '#9333ea',
  paddingVertical: 16,
  paddingHorizontal: 24,
  borderRadius: 12,
  shadowColor: '#9333ea',
  shadowOpacity: 0.3,
  elevation: 8,
}
```

#### Section Headers
```typescript
{
  fontSize: 18,
  fontWeight: '700',
  color: '#a78bfa',  // Purple light
  marginBottom: 12,
}
```

### ✨ Animations & Interactions

- **Smooth Transitions**: 200-300ms ease-in-out
- **Button Press**: Scale 0.95 on touch
- **Card Hover**: Subtle elevation increase
- **Loading States**: Purple activity indicators
- **Success Feedback**: Brief color flash and haptics

### 📱 Screen Patterns

#### Standard Screen Layout
```
┌─────────────────────────────┐
│  Title (28px, white)        │
│  Subtitle (15px, muted)     │
├─────────────────────────────┤
│                             │
│  Content Area               │
│  (Cards, Lists, Forms)      │
│                             │
│                             │
├─────────────────────────────┤
│  [Primary CTA Button]       │
└─────────────────────────────┘
```

#### Card Pattern
```
┌─────────────────────────────┐
│  Icon/Image                 │
│  Title (18px, purple)       │
│  Description (15px, slate)  │
│  Metadata (13px, dim)       │
└─────────────────────────────┘
```

---

## 🔐 Privacy & Security

### 🛡️ Data Protection

- ✅ **Local Storage Only**: All readings stored on your device
- ✅ **No Cloud Sync**: Palm images never uploaded to our servers
- ✅ **Encrypted Transit**: HTTPS for all API calls
- ✅ **No Accounts**: No login required, no authentication data
- ✅ **User Control**: Delete anytime from Profile screen

### 🔒 Third-Party Services

**Google Gemini AI**:
- Palm images sent to Gemini API for analysis only
- Google's privacy policy applies to this data
- Temporary processing, not permanent storage
- No other third parties have access to your data

### 📄 Privacy Policy

Full privacy policy available:
- In-app: Profile → Privacy Policy
- Web: [public/privacy.html](public/privacy.html)

---

## 🛠️ Build & Deployment

### 📦 Build Commands

```bash
# Preview builds (testing)
npm run build:android:preview    # Android APK
npm run build:ios:preview        # iOS build

# Production builds (store submission)
npm run build:android:production # Android AAB
npm run build:ios:production     # iOS build
npm run build:all:production     # Both platforms
```

### 🔄 Version Management

**Automatic Build Incrementing**:
- ✅ iOS build number auto-increments
- ✅ Android version code auto-increments
- ✅ Configured in `eas.json` with `autoIncrement: true`

See [docs/VERSION_MANAGEMENT.md](docs/VERSION_MANAGEMENT.md) for details.

### 🚀 First Build Setup

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Initialize EAS (first time only)
eas init

# Build!
npm run build:android:production
```

---

## 🐛 Troubleshooting

### Camera Issues
**Problem**: Camera not working  
**Solutions**:
- ✅ Grant camera permissions in device settings
- ✅ Restart the app
- ✅ Check if another app is using the camera
- ✅ Try on a physical device (simulators have limited camera)

### AI Analysis Fails
**Problem**: "Analysis failed" error  
**Solutions**:
- ✅ Verify Gemini API key in `.env`
- ✅ Check internet connection
- ✅ Ensure palm image is clear and well-lit
- ✅ Check API quotas in Google AI Studio

### Chat Not Responding
**Problem**: Chat doesn't send messages  
**Solutions**:
- ✅ Verify API key has active quota
- ✅ Check console for error messages
- ✅ Restart app and try again

### Build Errors
**Problem**: Build fails  
**Solutions**:
- ✅ Clear cache: `npm start -- --clear`
- ✅ Reinstall: `rm -rf node_modules && npm install`
- ✅ Check Node version: `node --version` (18+)

---

## 📚 Documentation

Comprehensive guides available in `/docs`:

- **[BRANDING.md](docs/BRANDING.md)** - Brand assets and design guidelines
- **[THEME_CONSISTENCY.md](docs/THEME_CONSISTENCY.md)** - Color palette and theme usage
- **[HISTORY_PROFILE.md](docs/HISTORY_PROFILE.md)** - History and Profile features
- **[VERSION_MANAGEMENT.md](docs/VERSION_MANAGEMENT.md)** - Auto-increment build versions
- **[ASSETS_INTEGRATION.md](ASSETS_INTEGRATION.md)** - Assets usage guide

---

## 📝 Future Roadmap

### Planned Features
- [ ] 🌍 Multi-language support (Spanish, Hindi, French)
- [ ] 📊 Reading comparisons (left vs right hand)
- [ ] 📄 Export readings as PDF
- [ ] 🔗 Share readings with friends
- [ ] 💎 Premium features with advanced AI models
- [ ] 📴 Offline mode with cached readings
- [ ] 📈 Reading analytics and trends over time
- [ ] 🎨 Customizable themes
- [ ] 🔔 Reading reminders

### Under Consideration
- [ ] Hand compatibility matching
- [ ] Palmistry learning modules
- [ ] Community features
- [ ] Video palm reading guides

---

## 🤝 Contributing

Contributions welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational and demonstration purposes.

**Disclaimer**: AI Palm Reading is for entertainment and self-reflection only. It does not predict the future or provide professional advice.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powerful vision and chat capabilities
- **Expo Team** - For excellent React Native tooling
- **React Native Community** - For amazing open-source libraries

---

## 👨‍💻 Developer

**Developed by Dhaval Trivedi**

- Email: support@aipalmreading.app
- Version: 1.0.0
- Built with: React Native, Expo, and Gemini 3 Pro AI

---

## 📞 Support

Need help? Have questions?

- 📧 Email: support@aipalmreading.app
- 📄 Privacy Policy: [public/privacy.html](public/privacy.html)
- 🐛 Report Issues: [GitHub Issues](https://github.com/drdhavaltrivedi/ai-palm-reading/issues)

---

<div align="center">

**Built with ❤️ using React Native, Expo, and Gemini 3 Pro AI**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/drdhavaltrivedi/ai-palm-reading/issues) •
[Request Feature](https://github.com/drdhavaltrivedi/ai-palm-reading/issues)

</div>
