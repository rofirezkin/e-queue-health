import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import BackButton from "@/components/ui/back-button";
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
              name="(antrian)/create-antrian"
              options={{
                title: "Buat Antrian",

                headerTintColor: "#fff",
                headerTitleStyle: { color: themeColors.background },
                headerStyle: {
                  backgroundColor: Colors[colorScheme ?? "light"].backgroundTab, // ini yang bener
                },

                headerBlurEffect: "light",
                headerLeft: () => <BackButton />,
              }}
            />
          </Stack>
          <StatusBar style="dark" backgroundColor="#000" />
        </SafeAreaView>
      </AppWrapper>
    </ThemeProvider>
  );
}
