import { useGetDaftarRiwayat } from "@/services/query/query/use-get-daftar-riwayat";
import { useGetPoli } from "@/services/query/query/use-get-poli";

import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user } = useAuthStore();

  // Ambil list poli
  const { data: poliData, isLoading: loadingPoli } = useGetPoli({});
  const poliList = poliData ?? [];

  // Ambil riwayat antrian pasien
  const { data, isLoading: loadingRiwayat } = useGetDaftarRiwayat({
    pasienId: user?.userId ?? 1,
  });

  // Ambil antrian pertama (paling baru)
  const latestQueue = data[0];

  // Ambil info poli dari poli_id
  const poliName =
    poliList.find((p: any) => p.id === latestQueue?.poli_id)?.nama_poli || "-";

  // Format tanggal kunjungan
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
          <Text style={styles.profileName}>{user?.numberPhone}</Text>
          <Text style={styles.profilePhone}>{user?.role}</Text>
        </View>
      </View>

      {/* Antrian Info */}
      <View style={styles.queueCard}>
        {loadingRiwayat ? (
          <ActivityIndicator color="#fff" />
        ) : latestQueue ? (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>No Antrian</Text>
              <Text style={styles.value}>
                {latestQueue.antrean?.nomor_antrean ?? "-"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Kunjungan</Text>
              <Text style={styles.value}>{formatDate(latestQueue.jadwal)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Poli</Text>
              <Text style={styles.value}>{poliName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>
                {latestQueue.antrean?.status || "Belum ada status"}
              </Text>
            </View>
          </>
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>
            Belum ada antrian aktif.
          </Text>
        )}
      </View>

      {/* Tombol Pesan */}
      <TouchableOpacity
        onPress={() => router.push("/antrian")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pesan Antrian Baru</Text>
      </TouchableOpacity>

      {/* List Poli */}
      <View style={styles.poliSection}>
        <Text style={styles.sectionTitle}>List Poli Klinik</Text>

        {loadingPoli ? (
          <ActivityIndicator
            size="large"
            color="#2F80ED"
            style={{ marginTop: 16 }}
          />
        ) : poliList.length > 0 ? (
          <View style={styles.poliGrid}>
            {poliList.map((poli: any) => (
              <TouchableOpacity
                key={poli.id}
                style={styles.poliCard}
                onPress={() =>
                  router.push({
                    pathname: "/create-antrian",
                    params: { id: poli.id },
                  })
                }
              >
                <Text style={styles.poliText}>{poli.nama_poli}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={{ textAlign: "center", color: "#888" }}>
            Belum ada data poli.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
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
  profilePhone: { color: "white", fontSize: 15, opacity: 0.8 },
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
  label: { color: "white", fontSize: 14 },
  value: { color: "white", fontWeight: "600" },
  button: {
    backgroundColor: "#2F80ED",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
  poliSection: { marginTop: 24, marginHorizontal: 20 },
  sectionTitle: { color: "#444", fontWeight: "600", marginBottom: 12 },
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
  poliText: { textAlign: "center", color: "white", fontWeight: "500" },
});
