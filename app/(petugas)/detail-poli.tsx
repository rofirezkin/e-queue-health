import Header from "@/components/ui/header";
import { useCreateLayanan } from "@/services/query/mutation";
import { useGetJadwalAktif } from "@/services/query/query/use-get-jadwal-aktif";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export const jadwalSchema = z.object({
  hari_operasional: z
    .array(z.string())
    .nonempty("Minimal satu hari harus dipilih"),
  jam_operasional_start: z.string().min(1, "Jam mulai wajib diisi"),
  jam_operasional_end: z.string().min(1, "Jam selesai wajib diisi"),
  kuota_harian: z.string().min(1, "Kuota wajib diisi"),
});

type TJadwalForm = z.infer<typeof jadwalSchema>;

export default function JadwalDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data, isLoading, refetch } = useGetJadwalAktif({
    poliId: Number(id),
  });
  const { mutate, isPending } = useCreateLayanan();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TJadwalForm>({
    resolver: zodResolver(jadwalSchema),
    defaultValues: {
      hari_operasional: [],
      jam_operasional_start: "",
      jam_operasional_end: "",
      kuota_harian: "",
    },
  });

  const [showModal, setShowModal] = useState<"start" | "end" | null>(null);
  const [tempTime, setTempTime] = useState<Date>(new Date());

  // 🧩 Prefill data dari API
  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const jadwal = data[0];
      reset({
        hari_operasional: jadwal.hari_operasional ?? [],
        jam_operasional_start: jadwal.jam_operasional_start ?? "",
        jam_operasional_end: jadwal.jam_operasional_end ?? "",
        kuota_harian: String(jadwal.kuota_harian ?? ""),
      });
    }
  }, [data]);

  // ⏰ Format waktu sesuai backend: "HH:MM:SS"
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = "00"; // backend pakai detik tetap
    return `${hours}:${minutes}:${seconds}`;
  };

  // 📨 Submit form ke API
  const onSubmit = (formData: TJadwalForm) => {
    mutate(
      {
        poli_id: Number(id),
        hari_operasional: formData.hari_operasional,
        jam_operasional_start: formData.jam_operasional_start,
        jam_operasional_end: formData.jam_operasional_end,
        kuota_harian: Number(formData.kuota_harian),
      },
      {
        onSuccess: () => {
          refetch();
          Alert.alert("✅ Sukses", "Jadwal berhasil diperbarui");
          router.back();
        },
        onError: () => {
          Alert.alert("❌ Gagal", "Terjadi kesalahan saat update jadwal");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <>
      <Header title="Setting Poli" />
      <ScrollView style={styles.container}>
        {/* Hari Operasional */}
        <Text style={styles.label}>Hari Operasional</Text>
        <Controller
          control={control}
          name="hari_operasional"
          render={({ field: { value, onChange } }) => (
            <View style={styles.dayContainer}>
              {days.map((day) => {
                const selected = value.includes(day);
                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selected && styles.dayButtonSelected,
                    ]}
                    onPress={() =>
                      onChange(
                        selected
                          ? value.filter((d) => d !== day)
                          : [...value, day]
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.dayText,
                        selected && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        />
        {errors.hari_operasional && (
          <Text style={styles.errorText}>
            {errors.hari_operasional.message}
          </Text>
        )}

        {/* Jam Mulai */}
        <Text style={styles.label}>Jam Mulai</Text>
        <Controller
          control={control}
          name="jam_operasional_start"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setShowModal("start");
                  setTempTime(new Date());
                }}
              >
                <Text style={{ color: value ? "#000" : "#999" }}>
                  {value || "Pilih Jam Mulai"}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={showModal === "start"}
                transparent
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Pilih Jam Mulai</Text>
                    <DateTimePicker
                      value={tempTime}
                      mode="time"
                      is24Hour
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selected) =>
                        selected && setTempTime(selected)
                      }
                    />
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        onPress={() => setShowModal(null)}
                        style={[styles.modalBtn, styles.cancelBtn]}
                      >
                        <Text style={styles.modalBtnText}>Batal</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onChange(formatTime(tempTime));
                          setShowModal(null);
                        }}
                        style={[styles.modalBtn, styles.saveBtn]}
                      >
                        <Text style={[styles.modalBtnText, { color: "#fff" }]}>
                          Simpan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />
        {errors.jam_operasional_start && (
          <Text style={styles.errorText}>
            {errors.jam_operasional_start.message}
          </Text>
        )}

        {/* Jam Selesai */}
        <Text style={styles.label}>Jam Selesai</Text>
        <Controller
          control={control}
          name="jam_operasional_end"
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setShowModal("end");
                  setTempTime(new Date());
                }}
              >
                <Text style={{ color: value ? "#000" : "#999" }}>
                  {value || "Pilih Jam Selesai"}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={showModal === "end"}
                transparent
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Pilih Jam Selesai</Text>
                    <DateTimePicker
                      value={tempTime}
                      mode="time"
                      is24Hour
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={(event, selected) =>
                        selected && setTempTime(selected)
                      }
                    />
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        onPress={() => setShowModal(null)}
                        style={[styles.modalBtn, styles.cancelBtn]}
                      >
                        <Text style={styles.modalBtnText}>Batal</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onChange(formatTime(tempTime));
                          setShowModal(null);
                        }}
                        style={[styles.modalBtn, styles.saveBtn]}
                      >
                        <Text style={[styles.modalBtnText, { color: "#fff" }]}>
                          Simpan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />
        {errors.jam_operasional_end && (
          <Text style={styles.errorText}>
            {errors.jam_operasional_end.message}
          </Text>
        )}

        {/* Kuota Harian */}
        <Text style={styles.label}>Kuota Harian</Text>
        <Controller
          control={control}
          name="kuota_harian"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Contoh: 30"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.kuota_harian && (
          <Text style={styles.errorText}>{errors.kuota_harian.message}</Text>
        )}

        {/* Tombol Simpan */}
        <TouchableOpacity
          style={[styles.button, isPending && { opacity: 0.7 }]}
          disabled={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  dayContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  dayButton: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dayButtonSelected: { backgroundColor: "#3B82F6" },
  dayText: { color: "#3B82F6", fontWeight: "500" },
  dayTextSelected: { color: "#fff" },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 28,
  },
  buttonText: { color: "#fff", fontWeight: "700", textAlign: "center" },

  // modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  modalBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelBtn: {
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },
  saveBtn: {
    backgroundColor: "#3B82F6",
  },
  modalBtnText: {
    fontWeight: "600",
    color: "#000",
  },
});
