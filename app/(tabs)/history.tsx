import { useGetDaftarRiwayat } from "@/services/query/query/use-get-daftar-riwayat"; // ✅ import hook
import { useAuthStore } from "@/store/useAuthStore"; // ✅ untuk ambil pasienId (kalau disimpan di auth)
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 🔹 Pastikan file hook lu tersimpan di path ini (atau sesuaikan path import)
export default function HistoryScreen() {
  const router = useRouter();

  // ✅ Misal ambil pasien_id dari store auth
  const { user } = useAuthStore();
  const pasienId = user?.userId ?? 1; // fallback sementara ke 1 biar gak error

  const { data, isLoading, isError } = useGetDaftarRiwayat({ pasienId });

  // ✅ Transformasi data supaya gampang dipakai di UI
  const histories = useMemo(
    () =>
      data?.map((item) => ({
        id: item.id,
        tanggal: new Date(item.tanggal_daftar).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        jadwal: new Date(item.jadwal).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: item.antrean?.status || "-",
        nomorAntrean: item.antrean?.nomor_antrean ?? "-",
        keluhan: item.keluhan,
      })) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 10 }}>Memuat riwayat pendaftaran...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data riwayat 😢</Text>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Riwayat Pendaftaran</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {histories.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Belum ada riwayat pendaftaran
          </Text>
        ) : (
          histories.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>ID Pendaftaran</Text>
                <Text style={styles.value}>{item.id}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Nomor Antrean</Text>
                <Text style={styles.value}>{item.nomorAntrean}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Status</Text>
                <Text
                  style={[
                    styles.value,
                    item.status === "selesai"
                      ? styles.statusDone
                      : styles.statusPending,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Tanggal Daftar</Text>
                <Text style={styles.value}>{item.tanggal}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Jadwal</Text>
                <Text style={styles.value}>{item.jadwal}</Text>
              </View>

              <View style={{ marginTop: 6 }}>
                <Text style={[styles.label, { fontWeight: "700" }]}>
                  Keluhan
                </Text>
                <Text style={[styles.value, { marginTop: 2 }]}>
                  {item.keluhan}
                </Text>
              </View>
            </View>
          ))
        )}
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
    paddingTop: 16,
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
    color: "#16A34A",
    fontWeight: "600",
  },
  statusPending: {
    color: "#F59E0B",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
