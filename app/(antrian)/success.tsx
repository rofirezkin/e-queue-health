import Header from "@/components/ui/header";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  console.log("Success params:", params);
  // Ambil nilai dari params
  const { id, poli_id, jadwal, keluhan } = params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Image
            source={require("@/assets/images/success.png")}
            style={styles.image}
          />
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            Berhasil Memesan Antrian
          </Text>
          {id ? (
            <View style={styles.infoRow}>
              <Text style={styles.label}>ID</Text>
              <Text style={styles.value}>{id}</Text>
            </View>
          ) : null}

          {poli_id ? (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Poli ID</Text>
              <Text style={styles.value}>{poli_id}</Text>
            </View>
          ) : null}

          {jadwal ? (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Jadwal</Text>
              <Text style={styles.value}>
                {new Date(jadwal as string).toLocaleString("id-ID")}
              </Text>
            </View>
          ) : null}

          {keluhan ? (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Keluhan</Text>
              <Text style={styles.value}>{keluhan}</Text>
            </View>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Kembali Ke Halaman Utama</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    color: "#000",
  },
  value: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 28,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
