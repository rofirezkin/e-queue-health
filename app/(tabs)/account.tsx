import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { reset } = useAuthStore.getState();
  const handleLogout = async () => {
    Alert.alert("Konfirmasi", "Apakah kamu yakin ingin logout?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            reset();
            router.replace("/login"); // redirect ke login
          } catch (error) {
            Alert.alert("Error", "Gagal logout. Coba lagi nanti.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Avatar */}
      <Image
        source={require("@/assets/images/profile-circle.png")}
        style={styles.avatar}
      />

      {/* Nama dan Nomor HP */}
      <Text style={styles.name}>{"User"}</Text>
      <Text style={styles.phone}>-00000</Text>

      {/* Menu Items */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Riwayat Pesanan</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>About</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={[styles.menuText]}>Logout</Text>
          <Text style={[styles.menuArrow]}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  phone: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  menu: {
    width: "100%",
  },
  menuItem: {
    borderWidth: 1,
    borderColor: "#2F80ED",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  menuArrow: {
    fontSize: 20,
    color: "#2F80ED",
  },
});
