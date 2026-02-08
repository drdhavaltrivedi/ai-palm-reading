# 🚀 Quick Start Guide - AI Palm Reading App

## Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the generated API key

> **Note**: Keep your API key secure and never commit it to version control!

## Step 2: Configure the App

1. In the project root, copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and paste your API key:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyD...your-actual-key-here
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run the App

### Option A: Development Server
```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

### Option B: Direct Platform Launch
```bash
# For iOS
npm run ios

# For Android
npm run android
```

## Step 5: Test the App

### First Time Setup
1. **Grant Camera Permission**: When prompted, allow camera access
2. **Home Screen**: You'll see the main dashboard
3. **Capture Palm**: Tap "Scan Your Palm"

### Capturing Your Palm
1. Position your palm within the guide overlay
2. Ensure good lighting for best results
3. Keep your palm steady and flat
4. Tap the capture button (white circle)
5. Select your hand:
   - Left or Right
   - Dominant or Non-dominant

### Viewing Your Reading
1. Wait for AI analysis (usually 5-10 seconds)
2. Browse through different sections:
   - Life Line
   - Heart Line
   - Head Line
   - And more!
3. Tap "Ask Questions" to start chatting

### Chatting About Your Reading
1. Tap the chat button on the reading screen
2. Try suggested questions or ask your own
3. Get personalized AI responses
4. Continue the conversation naturally

## 📱 Testing on Physical Device

### iOS (using Expo Go)
1. Install **Expo Go** from App Store
2. Run `npm start` in terminal
3. Scan QR code with Camera app
4. Opens in Expo Go automatically

### Android (using Expo Go)
1. Install **Expo Go** from Play Store
2. Run `npm start` in terminal
3. Scan QR code with Expo Go app

### Tunnel Option (for external testing)
If local network doesn't work:
```bash
npm run start:tunnel
```

## 🎯 Usage Tips

### For Best Palm Reading Results
- **Good Lighting**: Use natural light or bright indoor lighting
- **Clean Background**: Place palm against a plain background
- **Steady Hand**: Keep palm flat and steady during capture
- **Full Palm**: Ensure entire palm including fingers is visible
- **Clear Image**: Avoid shadows and blur

### Chat Features
- **Be Specific**: Ask detailed questions for better responses
- **Reference Sections**: Mention specific parts of your reading
- **Follow Up**: Ask follow-up questions for deeper insights
- **Explore Topics**: Ask about different palmistry aspects

## 🔧 Troubleshooting

### Camera Permission Issues
**Problem**: Camera not accessible
- **Solution**: Go to Phone Settings → {App} → Enable Camera

### API Key Not Working
**Problem**: Analysis fails with API error
- **Solution**: 
  1. Verify API key is correct in `.env`
  2. Restart development server: Ctrl+C, then `npm start`
  3. Check API key quota in Google Console

### App Won't Start
**Problem**: Error during `npm start`
- **Solution**:
  ```bash
  # Clear cache and reinstall
  rm -rf node_modules
  npm install
  npm start -- --clear
  ```

### Analysis Takes Too Long
**Problem**: Stuck on "Reading your palm..."
- **Solution**:
  1. Check internet connection
  2. Restart the app
  3. Try with a different image
  4. Verify API key has quota remaining

### Chat Not Responding
**Problem**: Messages send but no response
- **Solution**:
  1. Check internet connection
  2. Verify API key is valid
  3. Check console for error messages
  4. Restart the app

## 📊 Gemini API Limits

### Free Tier (as of 2024)
- **15 requests per minute** (RPM)
- **1 million tokens per day**
- **1,500 requests per day**

### Best Practices
- Don't spam requests
- One palm reading ≈ 1-2 API calls
- Chat messages ≈ 1 API call each
- Cache readings locally (automatically done)

## 🎨 Customization

### Change Theme Colors
Edit `src/app/theme/colors.ts` (if exists) or update StyleSheet colors in components.

### Modify Reading Sections
Edit the prompt in `src/app/services/gemini.ts`:
```typescript
const palmReadingPrompt = `You are an expert palm reader...`
```

### Add New Chat Suggestions
Edit `PalmReadingChat.getSuggestedQuestions()` in `src/app/services/gemini.ts`.

## 🔄 Development Workflow

### Making Changes
1. Edit code in your preferred editor
2. App hot-reloads automatically
3. View changes immediately on device/simulator

### Debugging
- **React Native Debugger**: Press `Cmd+D` (iOS) or `Cmd+M` (Android)
- **Console Logs**: Check terminal output
- **Network**: Monitor in debugger tools

### Building for Production
```bash
# Configure EAS (if not done)
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

## 📚 Next Steps

1. ✅ Set up Gemini API key
2. ✅ Run the app
3. ✅ Capture your first palm
4. ✅ Explore the AI reading
5. ✅ Try the chat feature
6. 📖 Read through main README.md for detailed documentation
7. 🧪 Experiment with different hands and lighting
8. 🎨 Customize the app to your liking

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review error messages in the terminal
- Check console logs in the app
- Verify all environment variables are set correctly

---

**Happy Palm Reading! 🔮✋**
