import { Redirect, Tabs } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/useAuthStore";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { token, user, isHydrated } = useAuthStore();

  // ✅ Cek state navigator root

  console.log("User Role:", user?.role);

  if (!isHydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!token) {
    return <Redirect href={"/(onboarding)/login"} />;
  }

  if (user?.role === "petugas" && token) {
    return <Redirect href={"/(petugas)/home"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].backgroundTab,
          borderTopColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="clock.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.crop.circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
