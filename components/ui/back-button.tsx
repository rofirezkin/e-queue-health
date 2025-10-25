// components/BackButton.tsx
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, useColorScheme } from "react-native";

export default function BackButton({ color = "#000" }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        name="chevron-back"
        size={24}
        color={Colors[colorScheme || "light"].background}
      />
    </TouchableOpacity>
  );
}
