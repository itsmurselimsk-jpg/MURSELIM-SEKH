import JSZip from 'jszip';

export async function downloadProjectZip() {
  const zip = new JSZip();

  // Basic project meta files
  zip.file(
    'README.md',
    `# Free Fire SensiPro A-Z Engine

Free Fire Headshot Sensitivity & Control Code Engine (OB46 / OB47 Enhanced).
Includes:
- Dynamic Sensi Calculator (OB200 & 0-100 Scales)
- Player UID Control Code Resolver & HUD Decoder
- Pro-Aim Visual Animated Drag Blueprints (Straight, J-Shape, Rotation, White Snap)
- 4-Character Headshot Skill Combinations
- Custom Room 1v1 / 4v4 Rules & Invite Card Generator
- In-Game Crosshair & Spray Bloom Recoil Simulator
- Side-by-Side Sensi Comparison vs Raistar, White444, TotalGaming
- Safe DPI Calculator & Developer Options Guides

## Quick Start
\`\`\`bash
npm install
npm run dev
\`\`\`

## Build for Production
\`\`\`bash
npm run build
\`\`\`

## Convert to Android APK
You can convert this repository into a native Android APK using Capacitor:
\`\`\`bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "FF SensiPro" "com.ffsensipro.headshotengine"
npm run build
npx cap add android
npx cap open android
\`\`\`
Or upload this repository to https://www.pwabuilder.com to get an APK / Google Play package in 1 click!
`
  );

  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'ff-sensipro-az-engine',
        private: true,
        version: '4.8.2',
        type: 'module',
        scripts: {
          dev: 'vite --port=3000 --host=0.0.0.0',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          'lucide-react': '^0.546.0',
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          motion: '^12.23.24',
        },
        devDependencies: {
          '@vitejs/plugin-react': '^6.1.1',
          tailwindcss: '^4.3.3',
          typescript: '^7.0.2',
          vite: '^8.3.0',
        },
      },
      null,
      2
    )
  );

  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`
  );

  zip.file(
    'index.html',
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>FF SensiPro A-Z Engine</title>
  </head>
  <body class="bg-zinc-950 text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    'capacitor.config.json',
    JSON.stringify(
      {
        appId: 'com.ffsensipro.headshotengine',
        appName: 'FF SensiPro A-Z Engine',
        webDir: 'dist',
        bundledWebRuntime: false,
        server: {
          androidScheme: 'https',
        },
        plugins: {
          StatusBar: {
            style: 'DARK',
            backgroundColor: '#09090b',
          },
        },
      },
      null,
      2
    )
  );

  // Complete Native Android Studio Project Structure
  zip.file(
    'android/build.gradle',
    `buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.1'
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
apply from: "variables.gradle"
allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
task clean(type: Delete) {
    delete rootProject.buildDir
}
`
  );

  zip.file(
    'android/variables.gradle',
    `ext {
    minSdkVersion = 22
    compileSdkVersion = 34
    targetSdkVersion = 34
    androidxActivityVersion = '1.8.0'
    androidxAppCompatVersion = '1.6.1'
    androidxCoordinatorLayoutVersion = '1.2.0'
    androidxCoreVersion = '1.12.0'
    androidxFragmentVersion = '1.6.2'
    junitVersion = '4.13.2'
    androidxJunitVersion = '1.1.5'
    androidxEspressoCoreVersion = '3.5.1'
    cordovaAndroidVersion = '10.1.1'
}
`
  );

  zip.file(
    'android/settings.gradle',
    `include ':app'
rootProject.name = 'android'
`
  );

  zip.file(
    'android/gradle.properties',
    `org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
android.useAndroidX=true
android.enableJetifier=true
`
  );

  zip.file(
    'android/app/build.gradle',
    `apply plugin: 'com.android.application'

android {
    namespace "com.ffsensipro.headshotengine"
    compileSdkVersion rootProject.ext.compileSdkVersion
    defaultConfig {
        applicationId "com.ffsensipro.headshotengine"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 40802
        versionName "4.8.2"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "androidx.appcompat:appcompat:\$androidxAppCompatVersion"
    implementation "androidx.coordinatorlayout:coordinatorlayout:\$androidxCoordinatorLayoutVersion"
    implementation "androidx.core:core-splashscreen:1.0.1"
    implementation project(':capacitor-android')
}
`
  );

  zip.file(
    'android/app/src/main/AndroidManifest.xml',
    `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme.NoActionBarLaunch">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    <!-- Permissions for Hardware Vibration Feedback -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
`
  );

  zip.file(
    'android/app/src/main/java/com/ffsensipro/headshotengine/MainActivity.java',
    `package com.ffsensipro.headshotengine;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}
`
  );

  zip.file(
    'android/app/src/main/res/values/strings.xml',
    `<resources>
    <string name="app_name">FF SensiPro</string>
    <string name="title_activity_main">FF SensiPro A-Z Engine</string>
    <string name="package_name">com.ffsensipro.headshotengine</string>
    <string name="custom_url_scheme">com.ffsensipro.headshotengine</string>
</resources>
`
  );

  zip.file(
    'android/app/src/main/res/values/styles.xml',
    `<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">#09090b</item>
        <item name="colorPrimaryDark">#000000</item>
        <item name="colorAccent">#f59e0b</item>
    </style>
    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:statusBarColor">#09090b</item>
    </style>
    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme.NoActionBar">
        <item name="android:background">#09090b</item>
    </style>
</resources>
`
  );

  zip.file(
    '.github/workflows/deploy-web.yml',
    `name: Deploy Web App to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy-web:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install --legacy-peer-deps --no-audit --no-fund

      - name: Build Web Application
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Web Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
  );

  // Generate ZIP blob and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ff-sensipro-az-engine-source.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
