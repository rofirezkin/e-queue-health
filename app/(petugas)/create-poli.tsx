import Header from "@/components/ui/header";
import { useCreatePoli } from "@/services/query/mutation";
import { GET_POLI } from "@/services/query/query/use-get-poli"; // ✅ Import key query
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query"; // ✅ buat invalidate
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { z } from "zod";

// 🧱 Schema validasi
const poliSchema = z.object({
  nama_poli: z.string().min(3, "Nama poli minimal 3 karakter"),
});

type TCreatePoli = z.infer<typeof poliSchema>;

export default function CreatePoliScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreatePoli();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCreatePoli>({
    resolver: zodResolver(poliSchema),
    defaultValues: { nama_poli: "" },
  });

  const onSubmit = (data: TCreatePoli) => {
    mutate(data, {
      onSuccess: () => {
        // 🧠 Invalidate cache daftar poli
        queryClient.invalidateQueries({ queryKey: [GET_POLI] });

        Alert.alert("✅ Sukses", "Poli berhasil dibuat");
        reset();
        router.back();
      },
      onError: () => {
        Alert.alert("❌ Gagal", "Terjadi kesalahan saat membuat poli");
      },
    });
  };

  return (
    <>
      <Header title="Tambah Poli Baru" />
      <ScrollView style={styles.container}>
        {/* Input Nama Poli */}
        <Text style={styles.label}>Nama Poli</Text>
        <Controller
          control={control}
          name="nama_poli"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Contoh: Poli Umum"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nama_poli && (
          <Text style={styles.errorText}>{errors.nama_poli.message}</Text>
        )}

        {/* Tombol Simpan */}
        <TouchableOpacity
          style={[styles.button, isPending && { opacity: 0.7 }]}
          disabled={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Menyimpan..." : "Simpan Poli"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 28,
  },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },
});
