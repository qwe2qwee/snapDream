// ImageUpscaleScreen.js
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ImageUpscaleScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [enhanceModel, setEnhanceModel] = useState("Classic");
  const [upscaleLevel, setUpscaleLevel] = useState("4x");
  const [credits] = useState(10);
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleGenerate = () => {
    console.log("Generating with:", { enhanceModel, upscaleLevel });
    // Add your generation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Image Upscale</Text>
        <View style={styles.backButton} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.uploadedImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleRemoveImage}
            >
              <Feather name="x" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadArea}
            onPress={handleImageUpload}
          >
            <View style={styles.exampleImagesContainer}>
              <View
                style={[
                  styles.exampleImageCard,
                  { backgroundColor: "#8b5cf6" },
                ]}
              >
                <View style={styles.exampleImage} />
              </View>
              <View
                style={[
                  styles.exampleImageCard,
                  styles.exampleImageCenter,
                  { backgroundColor: "#ec4899" },
                ]}
              >
                <View style={styles.exampleImage} />
              </View>
              <View
                style={[
                  styles.exampleImageCard,
                  { backgroundColor: "#f59e0b" },
                ]}
              >
                <View style={styles.exampleImage} />
              </View>
            </View>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="sliders" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={selectedImage ? handleGenerate : handleImageUpload}
        >
          <View style={styles.creditsContainer}>
            <Feather name="zap" size={18} color="#1a1a1a" />
            <Text style={styles.creditsText}>{credits}</Text>
          </View>
          <Text style={styles.generateText}>Generate</Text>
        </TouchableOpacity>
      </View>

      {/* Options Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="down"
        style={styles.modal}
        backdropOpacity={0.5}
        propagateSwipe={true}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHandle} />

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Enhance Model */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Enhance Model</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  enhanceModel === "Classic" && styles.optionButtonActive,
                ]}
                onPress={() => setEnhanceModel("Classic")}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    enhanceModel === "Classic" && styles.optionButtonTextActive,
                  ]}
                >
                  Classic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  enhanceModel === "Pro" && styles.optionButtonActive,
                ]}
                onPress={() => setEnhanceModel("Pro")}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    enhanceModel === "Pro" && styles.optionButtonTextActive,
                  ]}
                >
                  Pro
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  enhanceModel === "Flash" && styles.optionButtonActive,
                ]}
                onPress={() => setEnhanceModel("Flash")}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    enhanceModel === "Flash" && styles.optionButtonTextActive,
                  ]}
                >
                  Flash
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Upscale */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Upscale</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.upscaleButton,
                  upscaleLevel === "2x" && styles.upscaleButtonActive,
                ]}
                onPress={() => setUpscaleLevel("2x")}
              >
                <Text
                  style={[
                    styles.upscaleButtonText,
                    upscaleLevel === "2x" && styles.upscaleButtonTextActive,
                  ]}
                >
                  2x
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.upscaleButton,
                  upscaleLevel === "4x" && styles.upscaleButtonActive,
                ]}
                onPress={() => setUpscaleLevel("4x")}
              >
                <Text
                  style={[
                    styles.upscaleButtonText,
                    upscaleLevel === "4x" && styles.upscaleButtonTextActive,
                  ]}
                >
                  4x
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generate Button in Modal */}
          <View style={styles.modalBottomActions}>
            <TouchableOpacity style={styles.modalSettingsButton}>
              <Feather name="sliders" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalGenerateButton}
              onPress={() => {
                handleGenerate();
                toggleModal();
              }}
            >
              <View style={styles.creditsContainer}>
                <Feather name="zap" size={18} color="#1a1a1a" />
                <Text style={styles.creditsText}>{credits}</Text>
              </View>
              <Text style={styles.generateText}>Generate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1d2e",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#2a2d3e",
    aspectRatio: 0.85,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadArea: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2a2d3e",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f2233",
  },
  exampleImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  exampleImageCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginHorizontal: -10,
    transform: [{ rotate: "-8deg" }],
  },
  exampleImageCenter: {
    transform: [{ rotate: "0deg" }, { scale: 1.1 }],
    zIndex: 2,
  },
  exampleImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  settingsButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2a2d3e",
    alignItems: "center",
    justifyContent: "center",
  },
  generateButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  creditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  creditsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  generateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#2a2d3e",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#4a4d5e",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#8a8d9e",
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3a3d4e",
    alignItems: "center",
    justifyContent: "center",
  },
  optionButtonActive: {
    backgroundColor: "#fff",
  },
  optionButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  optionButtonTextActive: {
    color: "#1a1a1a",
  },
  upscaleButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#3a3d4e",
    alignItems: "center",
    justifyContent: "center",
  },
  upscaleButtonActive: {
    backgroundColor: "#fff",
  },
  upscaleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  upscaleButtonTextActive: {
    color: "#1a1a1a",
  },
  modalBottomActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  modalSettingsButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3a3d4e",
    alignItems: "center",
    justifyContent: "center",
  },
  modalGenerateButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
