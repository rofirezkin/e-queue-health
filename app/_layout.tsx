import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AppWrapper } from "@/provider/client-provider";
import { SafeAreaView } from "react-native-safe-area-context";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppWrapper>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen
              name="(onboarding)/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(onboarding)/register"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(petugas)/home"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(petugas)/create-poli"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(petugas)/detail-poli"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(antrian)/success"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(antrian)/create-antrian"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(antrian)/antrian"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="dark" backgroundColor="#000" />
        </SafeAreaView>
      </AppWrapper>
    </ThemeProvider>
  );
}
