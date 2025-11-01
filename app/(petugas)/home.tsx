import { useGetPoli } from "@/services/query/query/use-get-poli";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const { data, isLoading, isError } = useGetPoli({});

  const { reset } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Konfirmasi", "Apakah kamu yakin ingin logout?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          reset();
          router.replace("/login");
        },
      },
    ]);
  };

  const handleDelete = (id: number) => {
    Alert.alert("Konfirmasi", "Yakin ingin menghapus poli ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {},
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 10 }}>Loading data poli...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data poli 😢</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={() =>
          router.push({ pathname: "/detail-poli", params: { id: item.id } })
        }
      >
        <Text style={styles.poliName}>{item.nama_poli}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
        disabled={false}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Poli</Text>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => router.push("/create-poli")}
      >
        <Text style={styles.addButtonText}>+ Tambah Poli</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
    color: "#111827",
  },
  addButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  poliName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  deleteButton: {
    paddingLeft: 12,
  },
  deleteText: {
    fontSize: 18,
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
