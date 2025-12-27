import { Redirect } from "expo-router";
import React from "react";

/**
 * Root index.tsx serves as the application entry point.
 * By default, we redirect to the main (tabs) group.
 * If you implement onboarding logic, you could check storage here
 * and redirect to "/onboarding" if it's the user's first time.
 */
export default function Index() {
  // For now, we redirect to the main app structure.
  // This solves the conflict between root index.tsx (onboarding)
  // and (tabs)/index.tsx (home).
  return <Redirect href="/onboarding" />;
}
