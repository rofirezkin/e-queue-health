import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HistoryScreen() {
  const router = useRouter();

  const histories = [
    {
      id: "9449499494",
      status: "Selesai",
      tanggal: "20 Nov 2025",
      catatan: "Selesai Pemeriksaan",
    },
    {
      id: "9449499494",
      status: "Menunggu Approval",
      tanggal: "20 Nov 2025",
      catatan: "-",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {histories.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>ID Pendaftaran</Text>
              <Text style={styles.value}>{item.id}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status</Text>
              <Text
                style={[
                  styles.value,
                  item.status === "Selesai"
                    ? styles.statusDone
                    : styles.statusPending,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Pendaftaran</Text>
              <Text style={styles.value}>{item.tanggal}</Text>
            </View>

            <View style={{ marginTop: 6 }}>
              <Text style={[styles.label, { fontWeight: "700" }]}>Catatan</Text>
              <Text style={[styles.value, { marginTop: 2 }]}>
                {item.catatan}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#3B82F6",
    paddingTop: 48,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#000",
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  statusDone: {
    color: "#16A34A", // hijau untuk selesai
    fontWeight: "600",
  },
  statusPending: {
    color: "#F59E0B", // oranye untuk pending
    fontWeight: "600",
  },
});
