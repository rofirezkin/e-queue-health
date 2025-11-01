import Header from "@/components/ui/header";
import { useGetPoli } from "@/services/query/query/use-get-poli";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AntrianScreen() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetPoli({});

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Antrian Baru" />

      {/* Loading State */}
      {isLoading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ marginTop: 8 }}>Memuat data poli...</Text>
        </View>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <View style={styles.center}>
          <Text style={{ color: "#EF4444" }}>Gagal memuat data poli 😢</Text>
        </View>
      )}

      {/* Body */}
      {!isLoading && !isError && (
        <ScrollView contentContainerStyle={styles.body}>
          {data?.map((poli: any) => (
            <TouchableOpacity
              key={poli.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/create-antrian",
                  params: { id: poli.id },
                })
              }
            >
              <Text style={styles.cardText}>{poli.nama_poli}</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    padding: 16,
  },
  card: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
