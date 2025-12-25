import { GradientBackground } from "@/components/GradientBackground";
import { useFontFamily } from "@/hooks/useFontFamily";
import { useResponsive } from "@/hooks/useResponsive";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const SLIDES = [
  {
    id: 1,
    title: "Transform your images\nwith stunning effects",
    description: "Generate beautiful images and videos using just your words.",
    type: "effects",
  },
  {
    id: 2,
    title: "Turn Words into Images &\nVideos",
    description: "Generate beautiful images and videos using just your words.",
    type: "generation",
  },
  {
    id: 3,
    title: "Turn Words into Images &\nVideos",
    description: "Generate beautiful images and videos using just your words.",
    type: "models",
  },
];

const EFFECT_IMAGES = [
  require("../assets/images/onboarding1/9.png"),
  require("../assets/images/onboarding1/10.png"),
  require("../assets/images/onboarding1/11.png"),
  require("../assets/images/onboarding1/12.png"),
  require("../assets/images/onboarding1/13.png"),
  require("../assets/images/onboarding1/15.png"),
];

const MODELS = [
  {
    name: "SDXL\nBase",
    label: "Stable Diffusion XL",
    model: "sdxl_base_1.0.safetensors",
    type: "checkpoint",
    gradient: ["#4A1F1F", "#2A0F0F"],
  },
  {
    name: "SDXL\nRefiner",
    label: "SDXL Refiner",
    model: "sdxl_refiner_1.0.safetensors",
    type: "checkpoint",
    gradient: ["#1F3A4A", "#0F1A2A"],
  },
  {
    name: "Realistic\nVision",
    label: "Realistic Vision v6",
    model: "realisticVisionV60B1.safetensors",
    type: "checkpoint",
    gradient: ["#4A1F4A", "#2A0F2A"],
  },
  {
    name: "Juggernaut\nXL",
    label: "Juggernaut XL",
    model: "juggernautXL_v9.safetensors",
    type: "checkpoint",
    gradient: ["#3A4A1F", "#1A2A0F"],
  },
  {
    name: "Anime\nXL",
    label: "Animagine XL",
    model: "animagineXLV3.safetensors",
    type: "checkpoint",
    gradient: ["#4A1F3A", "#2A0F1A"],
  },
];

const GENERATION_IMAGES = [
  require("../assets/images/onboarding2/Onboarding2.png"),
];

export default function OnboardingScreen() {
  const {
    width,
    spacing,
    typography,
    getResponsiveValue,
    getBorderRadius,
    safeAreaTop,
    safeAreaBottom,
    isTablet,
  } = useResponsive();

  const fonts = useFontFamily();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Responsive values
  const responsiveValues = useMemo(
    () => ({
      // Floating images
      floatingImageSize: getResponsiveValue(100, 120, 140, 160, 180),
      floatingImageBorderRadius: getBorderRadius("large"),

      // Generation image
      mainImageSize: isTablet ? width * 0.5 : width * 0.7,
      sideImageSize: getResponsiveValue(60, 70, 80, 90, 100),

      // Model cards
      modelCardSize: isTablet
        ? (width - spacing.lg * 3) / 3
        : (width - spacing.xl * 2 - spacing.md * 2) / 2,

      // Typography
      titleSize: getResponsiveValue(18, 22, 26, 30, 34),
      titleLineHeight: getResponsiveValue(26, 30, 34, 38, 42),
      descSize: getResponsiveValue(14, 15, 16, 17, 18),
      descLineHeight: getResponsiveValue(20, 22, 24, 26, 28),

      // Button
      buttonHeight: getResponsiveValue(56, 60, 64, 68, 72),
      buttonTextSize: getResponsiveValue(16, 17, 18, 19, 20),

      // Pagination
      dotSize: 8,
      dotActive: getResponsiveValue(18, 20, 22, 24, 26),
    }),
    [width, spacing, getResponsiveValue, getBorderRadius, isTablet]
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    } else {
      router.replace("/(tabs)");
    }
  };

  const renderSlide = (slide: (typeof SLIDES)[0]) => {
    return (
      <View key={slide.id} style={[styles.slide, { width }]}>
        <View style={styles.contentContainer}>
          {/* Slide 1: Floating Images */}
          {slide.type === "effects" && (
            <View style={styles.effectsContainer}>
              {EFFECT_IMAGES.map((uri, idx) => {
                const positions: (ViewStyle & {
                  rotate: string;
                  scale?: number;
                })[] = [
                  { top: "8%", left: "2%", rotate: "-15deg", scale: 0.85 },
                  { top: "8%", right: "8%", rotate: "12deg", scale: 0.95 },
                  { top: "38%", left: "17%", rotate: "-10deg", scale: 0.65 },
                  { bottom: "2%", left: "10%", rotate: "8deg", scale: 0.8 },
                  { bottom: "1%", right: "-5%", rotate: "-12deg", scale: 0.9 },
                  { top: "56%", right: "30%", rotate: "15deg", scale: 0.7 },
                ];
                const { rotate, scale, ...styleProps } = positions[idx];

                return (
                  <View
                    key={idx}
                    style={[
                      styles.floatingImageWrapper,
                      {
                        ...styleProps,
                        width:
                          responsiveValues.floatingImageSize * (scale || 1),
                        height:
                          responsiveValues.floatingImageSize * (scale || 1),
                        transform: [{ rotate: rotate }],
                      },
                    ]}
                  >
                    <Image
                      source={uri}
                      style={[
                        styles.floatingImage,
                        {
                          borderRadius:
                            responsiveValues.floatingImageBorderRadius,
                        },
                      ]}
                      contentFit="cover"
                    />
                  </View>
                );
              })}
            </View>
          )}

          {/* Slide 2: Generation */}
          {slide.type === "generation" && (
            <View style={styles.generationContainer}>
              {/* Decorative background element */}
              <View style={styles.decorativeCircle} />

              {/* Main center image */}
              <View
                style={[
                  styles.mainImageWrapper,
                  {
                    width: responsiveValues.mainImageSize,
                    height: responsiveValues.mainImageSize * 1.3,
                    borderRadius:
                      responsiveValues.floatingImageBorderRadius + 12,
                  },
                ]}
              >
                <Image
                  source={GENERATION_IMAGES[0]}
                  style={styles.mainImage}
                  contentFit="cover"
                />
              </View>
            </View>
          )}

          {/* Slide 3: Model Cards Grid */}
          {slide.type === "models" && (
            <View style={[styles.modelsContainer, { gap: spacing.md }]}>
              {MODELS.map((model, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.modelCardWrapper,
                    {
                      width: responsiveValues.modelCardSize - spacing.md,
                      height: responsiveValues.modelCardSize - spacing.md,
                    },
                  ]}
                >
                  <LinearGradient
                    colors={model.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.modelCard,
                      {
                        borderRadius:
                          responsiveValues.floatingImageBorderRadius,
                      },
                    ]}
                  >
                    <View style={styles.modelContent}>
                      <Text
                        style={[
                          styles.modelName,
                          {
                            fontSize: getResponsiveValue(12, 14, 16, 18, 20),
                            fontFamily: fonts.Bold,
                          },
                        ]}
                      >
                        {model.name}
                      </Text>
                      <View
                        style={[styles.modelBadge, { marginTop: spacing.xs }]}
                      >
                        <Text
                          style={[
                            styles.modelBadgeText,
                            {
                              fontSize: getResponsiveValue(8, 9, 10, 11, 12),
                              fontFamily: fonts.Medium,
                            },
                          ]}
                        >
                          {model.type.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.modelLabelOverlay}>
                      <Text
                        style={[
                          styles.modelLabelText,
                          {
                            fontSize: getResponsiveValue(10, 11, 12, 13, 14),
                            fontFamily: fonts.Regular,
                          },
                        ]}
                        numberOfLines={1}
                      >
                        {model.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Text Content */}
        <View
          style={[
            styles.textContainer,
            {
              paddingHorizontal: spacing.xl,
              marginBottom: spacing.xl,
            },
          ]}
        >
          {/* Pagination Dots */}
          <View
            style={[
              styles.pagination,
              { gap: spacing.xs, marginBottom: spacing.lg },
            ]}
          >
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    width:
                      i === activeIndex
                        ? responsiveValues.dotActive
                        : responsiveValues.dotSize,
                    height: responsiveValues.dotSize,
                    borderRadius: responsiveValues.dotSize / 2,
                    backgroundColor:
                      i === activeIndex
                        ? "#FFFFFF"
                        : "rgba(255, 255, 255, 0.2)",
                  },
                ]}
              />
            ))}
          </View>

          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                fontSize: responsiveValues.titleSize,
                lineHeight: responsiveValues.titleLineHeight,
                fontFamily: fonts.Bold,
                marginBottom: spacing.md,
              },
            ]}
          >
            {slide.title}
          </Text>

          {/* Description */}
          <Text
            style={[
              styles.description,
              {
                fontSize: responsiveValues.descSize,
                lineHeight: responsiveValues.descLineHeight,
                fontFamily: fonts.Regular,
              },
            ]}
          >
            {slide.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <GradientBackground>
      <View style={[styles.container, { paddingTop: safeAreaTop }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {SLIDES.map((slide) => renderSlide(slide))}
        </ScrollView>

        {/* Footer Button */}
        <View
          style={[
            styles.footer,
            {
              paddingHorizontal: spacing.md,
              paddingBottom: safeAreaBottom + spacing.md,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                height: responsiveValues.buttonHeight - spacing.xs,
                borderRadius: responsiveValues.buttonHeight / 2,
              },
            ]}
            onPress={handleNext}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: responsiveValues.buttonTextSize,
                  fontFamily: fonts.Bold,
                },
              ]}
            >
              {activeIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  // Effects (Slide 1)
  effectsContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  floatingImageWrapper: {
    position: "absolute",
  },
  floatingImage: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },

  // Generation (Slide 2)
  generationContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  decorativeCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    zIndex: 1,
  },
  mainImageWrapper: {
    overflow: "hidden",
    position: "relative",
    zIndex: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },

  // Models (Slide 3)
  modelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modelCardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modelCard: {
    flex: 1,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modelContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  modelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
  },
  modelBadgeText: {
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  modelName: {
    color: "#FFFFFF",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  modelLabelOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  modelLabelText: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },

  // Text Section
  textContainer: {
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
  },
  dot: {
    // Dynamic sizing applied
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  description: {
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },

  // Footer
  footer: {
    // Dynamic padding applied
  },
  button: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#0D0D0F",
  },
});
