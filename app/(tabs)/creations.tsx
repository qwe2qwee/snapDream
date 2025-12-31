import React, { useMemo, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import Delete from "@/assets/icons/Dele.svg";
import { CreationsGrid } from "@/components/Creations/CreationsGrid";
import { EmptyState } from "@/components/Creations/EmptyState";
import { FilterTabs, FilterType } from "@/components/Creations/FilterTabs";
import { PageHeader } from "@/components/Creations/PageHeader";
import { GradientBackground } from "@/components/GradientBackground";
import { LoadingModal } from "@/components/Modals/LoadingModal";
import { ConfirmModal } from "@/components/Modals/modal";
import { ShareModal } from "@/components/Modals/shareModal";
import { CREATIONS } from "@/constants/data";
import { useResponsive } from "@/hooks/useResponsive";
import useLanguageStore from "@/store/useLanguageStore";

export default function CreationsScreen() {
  const { t } = useLanguageStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [creationsData, setCreationsData] = useState(CREATIONS);

  const { safeAreaTop, getTabBarHeight, spacing, getResponsiveValue } =
    useResponsive();

  // Modal states
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredCreations = creationsData.filter((creation) => {
    if (activeFilter === "all") return true;
    return creation.type === activeFilter;
  });

  const hasCreations = filteredCreations.length > 0;

  const handleShare = (id: number) => {
    setSelectedId(id);
    setShareModalVisible(true);
  };

  const handleDownload = (id: number) => {
    setSelectedId(id);
    setLoadingModalVisible(true);
    // Simulate download
    setTimeout(() => {
      setLoadingModalVisible(false);
      setSelectedId(null);
    }, 2000);
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      setCreationsData((prev) => prev.filter((item) => item.id !== selectedId));
      setDeleteModalVisible(false);
      setSelectedId(null);
    }
  };

  // Calculate tab bar height including safe area bottom
  const tabBarHeight = useMemo(() => getTabBarHeight(true), [getTabBarHeight]);

  // Dynamic styles with memoization
  const dynamicStyles = useMemo(
    () => ({
      container: {
        paddingTop: 0,
      },
      shareUrl: selectedId
        ? `https://myapp.com/creation/${selectedId}`
        : "https://myapp.com",
    }),
    [selectedId]
  );

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <GradientBackground>
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0F" />

        {/* Header */}
        <PageHeader title={t("creations.title")} isLoggedIn={true} />

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Content */}
        {hasCreations ? (
          <CreationsGrid
            creations={filteredCreations}
            onShare={handleShare}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ) : (
          <EmptyState />
        )}

        {/* Share Modal */}
        <ShareModal
          isVisible={shareModalVisible}
          onClose={() => setShareModalVisible(false)}
          shareUrl={dynamicStyles.shareUrl}
          title={t("common.share")}
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isVisible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          icon={
            <Delete
              color="#FFFFFF"
              width={getResponsiveValue(24, 26, 28, 30, 32)}
              height={getResponsiveValue(24, 26, 28, 30, 32)}
            />
          }
          onConfirm={confirmDelete}
          iconName="trash-2"
          iconColor="#FFFFFF"
          iconBackgroundColor="rgba(255, 255, 255, 0.05)"
          title={t("result.deleteTitle")}
          subtitle={t("result.deleteConfirm")}
          confirmText={t("common.delete")}
          showCloseButton={true}
        />

        {/* Loading Modal */}
        <LoadingModal
          isVisible={loadingModalVisible}
          title={t("creations.downloading")}
          onModalHide={() => {}}
        />
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0F",
  },
});
