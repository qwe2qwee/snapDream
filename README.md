# SnackDream - AI-Powered Creative Studio

<div align="center">
  <img src="./assets/images/adaptive-icon.png" alt="SnackDream Logo" width="120" height="120">
  
  **Transform your creativity with AI-powered image and video generation**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
</div>

---

## 📱 About

SnackDream is a premium mobile application that harnesses the power of AI to bring your creative visions to life. Whether you're generating images from text, swapping clothes, changing hairstyles, or creating videos, SnackDream provides professional-grade tools in an intuitive, beautiful interface.

## ✨ Features

### 🎨 Image Generation

- **Text to Image**: Generate stunning images from text prompts
- **Sketch to Image**: Transform sketches into realistic images
- **Image Upscaling**: Enhance image quality with 2x/4x upscaling
- **Multiple Models**: Choose from Classic, Pro, and Flash models

### 👔 Fashion & Style

- **Cloth Swap**: Try on different outfits virtually
- **Hair Style Changer**: Experiment with different hairstyles and colors
- **Outfit Variations**: Generate multiple outfit options

### 🎬 Video Generation

- **Text to Video**: Create videos from text descriptions
- **Multiple Formats**: Support for various aspect ratios and resolutions
- **Frame Rate Control**: 24, 30, or 60 FPS options

### 🌟 Additional Features

- **Community Gallery**: Browse and get inspired by community creations
- **Personal Creations**: Save and manage your generated content
- **Credits System**: Transparent credit-based usage
- **Premium UI**: Dark theme with smooth animations

## 🏗️ Architecture

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **UI Components**: Custom components with react-native-modal
- **Styling**: StyleSheet with responsive design system
- **Fonts**: SF Pro family (Text & Display)

### Project Structure

```
demo/
├── app/                          # App screens (file-based routing)
│   ├── (tabs)/                   # Tab navigator screens
│   │   ├── index.tsx            # Home screen
│   │   ├── community.tsx        # Community gallery
│   │   ├── creations.tsx        # User creations
│   │   └── profile.tsx          # User profile
│   ├── (auth)/                  # Authentication screens
│   ├── details/                 # Detail pages
│   ├── effects/                 # Effect category pages
│   ├── image-generation.tsx     # Image generation
│   ├── video-generation.tsx     # Video generation
│   ├── cloth-swap.tsx          # Cloth swap
│   ├── hairstyle/              # Hairstyle feature
│   ├── sketch-to-image.tsx     # Sketch to image
│   ├── image-upscale.tsx       # Image upscaler
│   └── _layout.tsx             # Root layout
├── components/                  # Reusable components
│   ├── ClothSwap/              # Cloth swap components
│   ├── GradientBackground/     # Background component
│   ├── Home/                   # Home screen components
│   ├── Imagegen/               # Image generation components
│   ├── ImageUpscale/           # Upscale components
│   ├── Modals/                 # Modal components
│   └── Profile/                # Profile components
├── constants/                   # App constants and data
├── hooks/                      # Custom React hooks
│   ├── useResponsive.ts       # Responsive design hook
│   └── useFontFamily.ts       # Font management hook
└── assets/                     # Images, icons, fonts
```

## 🎨 Design System

### Color Palette

- **Background**: `#0D0D0F` (Primary), `#1C1C1E` (Secondary), `#2C2C2E` (Tertiary)
- **Text**: `#FFFFFF` (Primary), `#A0A0A0` (Secondary), `#666666` (Tertiary)
- **Accent**: `#8A2BE2` (Purple)
- **Buttons**: `#FFFFFF` (Primary action)

### Typography

- **Font Family**: SF Pro Text & SF Pro Display
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components

- **Headers**: `ImageGenHeader` - Consistent header with back button
- **Buttons**: `GenerateButton` - White pill-shaped with credits display
- **Upload**: `ImageUploadBox` - Dashed border with image preview
- **Modals**: Bottom sheet pattern with slide animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npx expo start
```

4. **Run on device/simulator**

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app

## 📱 User Flow

```
Launch → Onboarding → Home Screen
                         ↓
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
   Image Gen        Video Gen       Cloth Swap
        ↓                ↓                ↓
   Configure        Configure        Upload
        ↓                ↓                ↓
   Generate         Generate         Generate
        ↓                ↓                ↓
   View Result      View Result      View Result
```

## 🔧 Configuration

### Responsive Design

The app uses a custom `useResponsive` hook that provides:

- Responsive spacing values
- Typography scaling
- Icon sizing
- Border radius
- Safe area handling

### Navigation

File-based routing with Expo Router:

- Tabs: `(tabs)` directory
- Stacks: Root level files
- Modals: Configured in `_layout.tsx`

## 📄 Pages Overview

### Generation Pages

- **Image Generation**: Text prompts with customizable options
- **Video Generation**: Text to video with duration/FPS control
- **Cloth Swap**: Virtual try-on with two image inputs
- **Sketch to Image**: Convert sketches to realistic images
- **Image Upscale**: Enhance image quality (2x/4x)
- **Hair Style**: Change hairstyles and colors

### Profile Pages

- **Terms & Conditions**: Legal terms
- **Privacy Policy**: Privacy information
- **Rate App**: App Store rating integration
- **Feedback**: User feedback form
- **Contact Us**: Support contact with social links

## 🎯 Key Features Implementation

### Bottom Sheet Options

All generation pages use consistent bottom sheet modals for options:

- Slide-up animation
- Dark themed (#2C2C2E)
- Close button with icon
- Scrollable content

### Image Upload

Standardized upload experience:

- Dashed border when empty
- Professional placeholder images
- Image preview when selected
- Remove button (X) overlay

### Credits System

- Display in header
- Show cost per generation
- Integrated with generate buttons

## 🔐 Authentication Flow

- Login screen
- Registration with email verification
- Forgot password with recovery
- Protected routes

## 📊 State Management

- React hooks (useState, useMemo)
- Local component state
- Navigation state via Expo Router

## 🎨 Animations

- Smooth page transitions
- Bottom sheet slide animations
- Button press feedback (activeOpacity)
- Loading states with ActivityIndicator

## 🌐 Social Integration

- App Store rating
- Email support
- Twitter: @SnackDreamApp
- Instagram: @snackdreamapp

## 📝 License

[Your License Here]

## 👥 Contributing

Contributions are welcome! Please read the contributing guidelines first.

## 📧 Support

For support, email support@snackdream.app or visit our contact page in the app.

---

<div align="center">
  Made with ❤️ by the SnackDream Team
</div>
