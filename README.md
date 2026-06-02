# Eye Prescription App 📝👁️

A self-contained, professional A4-optimized Eye Prescription generator built with React and Capacitor.

## Overview
This application is designed specifically for ophthalmologists to generate perfectly formatted, strictly-measured A4 PDF prescriptions. It bypasses the common layout shifting problems of native apps by relying on a highly optimized HTML/CSS rendering engine, packaged natively into an Android APK using Capacitor.

## Features
- **A4 PDF Engine:** Strict millimeter-based CSS ensures layouts never break, regardless of the text volume.
- **Auto-Persistence:** Any custom medicines, diagnoses, or complaints added by the doctor are automatically saved locally and persist across sessions.
- **Offline First:** Designed to be bundled as an APK, requiring zero internet access to function.

## Tech Stack
- **UI Framework:** React (via Expo Web)
- **Native Wrapper:** Capacitor (Ionic)
- **PDF Generation:** Standard Web Print APIs bridged by Capacitor on Android

## How to Run Locally

### Web Development
To run the app locally in a web browser for development:
```bash
npm install
npx expo start --web
```

### Building the Android APK
The project uses Capacitor to bundle the web output into an Android app.
1. Build the web bundle:
   ```bash
   npx expo export -p web --clear
   ```
2. Sync the bundle with the Android project:
   ```bash
   npx cap sync android
   ```
3. Build the APK via Gradle:
   ```bash
   export ANDROID_SDK_ROOT=/path/to/your/android/sdk
   cd android
   ./gradlew assembleDebug
   ```
   *The APK will be located in `android/app/build/outputs/apk/debug/app-debug.apk`.*

## Important Note on Layout
If you modify `src/utils/pdfTemplate.js`, you **must** strictly test the printed output. The layout uses hardcoded millimeter values (e.g., `height: 128mm`) to guarantee left/right column symmetry. Adding new fields without adjusting heights will cause the A4 PDF to spill onto a second page.
