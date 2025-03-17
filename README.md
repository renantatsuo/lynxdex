## Rspeedy project

This is a ReactLynx project bootstrapped with `create-rspeedy`.

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

Scan the QRCode in the terminal with your LynxExplorer App to see the result.

See: https://lynxjs.org/guide/start/quick-start.html

## Building the Project

First, build the lynx project:

```bash
bun run build
```

### iOS

1. Navigate to the `ios` directory and install the necessary pods:

   ```bash
   cd ios
   pod install
   ```

2. Open the `.xcworkspace` file in Xcode and build the project:
   1. Open Xcode.
   2. Select `File` > `Open` and choose the `.xcworkspace` file.
   3. Select your target device and click the build button.

### Android

1. Using the command line:

   ```bash
   cd android
   ./gradlew assembleDebug   # Build debug APK
   # or
   ./gradlew installDebug    # Build and install on connected device
   ```

2. Using Android Studio:
   1. Open Android Studio
   2. Select `File` > `Open` and choose the `android` directory
   3. Wait for the Gradle sync to complete
   4. Select your target device and click the Run button

## Credits

Based on Ricardo Schiniegoski figma file. https://www.figma.com/community/file/979132880663340794
