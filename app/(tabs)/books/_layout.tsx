import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="epub-reader-screen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
