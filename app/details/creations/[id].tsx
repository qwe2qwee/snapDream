import { ActionButtons } from "@/components/CreationDetails/ActionButtons";
import { ImageInfoBar } from "@/components/CreationDetails/ImageInfoBar";
import { PromptSection } from "@/components/CreationDetails/PromptSection";
import { ResultHeader } from "@/components/CreationDetails/ResultHeader";
import { ResultImage } from "@/components/CreationDetails/ResultImage";
import { GradientBackground } from "@/components/GradientBackground";
import { CREATIONS } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, Share, StyleSheet, View } from "react-native";

export default function CreationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const numericId = Number(id);
  // Find the item in CREATIONS data
  const item = CREATIONS.find((it) => it.id === numericId);

  const { spacing, safeAreaTop, safeAreaBottom } = useResponsive();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my AI creation!`,
        url: item?.uri || "",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share");
    }
  };

  const handleRegenerate = () => {
    Alert.alert("Regenerate", "Generating a new version of this creation...");
  };

  const handleDownload = () => {
    Alert.alert("Download", "Creation saved to gallery");
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Creation",
      "Are you sure you want to delete this creation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // In a real app, you would call an API or update state here
            Alert.alert("Deleted", "Creation has been removed");
            router.back();
          },
        },
      ]
    );
  };

  const copyPrompt = async () => {
    // If prompt exists, copy it
    if (item?.prompt) {
      await Clipboard.setStringAsync(item.prompt);
      Alert.alert("Copied!", "Prompt copied to clipboard");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: safeAreaTop,
    },
    scrollContent: {
      paddingBottom: safeAreaBottom + spacing.xl,
    },
  });

  // Mocking extra fields if they're not in the data but we want to show conditional rendering
  // Real data would have these fields optionally
  const itemPrompt = item?.prompt;
  const itemAIModel = item?.AIModel;
  const itemAspectRatio = item?.aspectRatio || "3:4 Aspect Ratio";

  const showInfo = !!itemAIModel;
  const showPrompt = !!itemPrompt;
  const isExpanded = !showInfo && !showPrompt;

  return (
    <GradientBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <ResultHeader title="My Creation" />

        <View style={isExpanded ? { flex: 1, minHeight: 400 } : {}}>
          <ResultImage
            imageUri={item?.uri || ""}
            containerStyle={isExpanded ? { flex: 1 } : {}}
          />
        </View>

        {/* Conditionally render ImageInfoBar if AIModel exists */}
        {showInfo && itemAIModel && (
          <ImageInfoBar model={itemAIModel} aspectRatio={itemAspectRatio} />
        )}

        {/* Conditionally render PromptSection if prompt exists */}
        {showPrompt && itemPrompt && (
          <PromptSection prompt={itemPrompt} onCopy={copyPrompt} />
        )}

        <View style={isExpanded ? { marginTop: "auto" } : {}}>
          <ActionButtons
            onShare={handleShare}
            onRegenerate={handleRegenerate}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
