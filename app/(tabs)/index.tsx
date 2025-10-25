import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const poliList = [
    "Poli Mata",
    "Poli Kandungan",
    "Poli Gigi",
    "Poli Anak",
    "Poli THT",
    "Poli Umum",
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.image}
      />

      {/* User Info */}
      <View style={styles.profileCard}>
        <Ionicons name="person-outline" size={24} color="white" />
        <View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profilePhone}>081348439933</Text>
        </View>
      </View>

      {/* Antrian Info */}
      <View style={styles.queueCard}>
        <View style={styles.row}>
          <Text style={styles.label}>No Antrian</Text>
          <Text style={styles.value}>30</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tanggal Kunjungan</Text>
          <Text style={styles.value}>30 Des 2025</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Poli</Text>
          <Text style={styles.value}>Umum</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>Sedang Berjalan</Text>
        </View>
      </View>

      {/* Tombol Pesan */}
      <TouchableOpacity
        onPress={() => router.push("/create-antrian")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pesan Antrian Baru</Text>
      </TouchableOpacity>

      {/* List Poli */}
      <View style={styles.poliSection}>
        <Text style={styles.sectionTitle}>List Poli Klinik</Text>
        <View style={styles.poliGrid}>
          {poliList.map((poli, i) => (
            <TouchableOpacity key={i} style={styles.poliCard}>
              <Text style={styles.poliText}>{poli}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#2F80ED",
  },
  headerText: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 8,
  },
  profileCard: {
    gap: 23,
    flexDirection: "row",
    padding: 28,
    backgroundColor: "#2F80ED",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,

    alignItems: "center",
  },
  profileName: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  profilePhone: {
    color: "white",
    fontSize: 15,
    opacity: 0.8,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
  queueCard: {
    backgroundColor: "#2F80ED",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    color: "white",
    fontSize: 14,
  },
  value: {
    color: "white",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2F80ED",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  poliSection: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    color: "#444",
    fontWeight: "600",
    marginBottom: 12,
  },
  poliGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  poliCard: {
    backgroundColor: "#6FB4F5",
    borderRadius: 16,

    width: "30%",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  poliText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 30,
  },
});
