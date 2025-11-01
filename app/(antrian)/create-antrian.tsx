import Header from "@/components/ui/header";
import { useCreateDaftar } from "@/services/query/mutation";
import { useGetPoli } from "@/services/query/query/use-get-poli";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

// ✅ Validasi input
const queueSchema = z.object({
  date: z.string().min(1, "Tanggal dan jam wajib diisi"),
  poli: z.string().min(1, "Pilih poli"),
  complaint: z.string().min(5, "Keluhan minimal 5 karakter"),
});

type QueueForm = z.infer<typeof queueSchema>;

export default function CreateAntrianScreen() {
  const { id } = useLocalSearchParams(); // ← param poli_id dari URL
  const { user } = useAuthStore();

  const createBookingPoli = useCreateDaftar({
    options: {
      onSuccess: (response) => {
        console.log("Berhasil membuat antrian:", response.data);
        router.push({
          pathname: "/success",
          params: {
            id: response?.data.id?.toString(),
            poli_id: response?.data.poli_id?.toString(),
            jadwal: response?.data.jadwal,
            keluhan: response?.data.keluhan,
          },
        });
      },
      onError: (error: any) => {
        Alert.alert(
          "Gagal membuat antrian",
          error?.message || "Terjadi kesalahan"
        );
      },
    },
  });
  const { data: poliList, isLoading } = useGetPoli({});

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QueueForm>({
    resolver: zodResolver(queueSchema),
    defaultValues: {
      date: "",
      poli: "",
      complaint: "",
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  // 🧠 Kalau ada ID poli di param → set otomatis
  useEffect(() => {
    if (id && poliList?.length) {
      const poliExists = poliList.find((p) => String(p.id) === String(id));
      if (poliExists) {
        setValue("poli", String(id));
      }
    }
  }, [id, poliList]);

  // 🔧 Format ke "DD-MM-YYYY HH:mm"
  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // 🔧 Ubah ke ISO buat backend
  const toISO = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("-");
    return `${year}-${month}-${day}T${timePart}:00`;
  };

  const onSubmit = async (data: QueueForm) => {
    const payload = {
      poli_id: Number(data.poli),
      pasien_id: user?.userId || 1,
      jadwal: toISO(data.date),
      keluhan: data.complaint,
      tanggal_daftar: new Date().toISOString().split("T")[0],
    };

    createBookingPoli.mutate(payload);
  };

  const selectedPoli = poliList?.find((p) => String(p.id) === id)?.id;

  return (
    <>
      <Header title="Antrian Baru" />

      <View style={styles.container}>
        {/* Nama */}

        {/* Tanggal & Jam */}
        <Text style={styles.label}>Tanggal & Jam Kunjungan</Text>
        <Controller
          control={control}
          name="date"
          defaultValue={selectedPoli || 0}
          render={({ field: { onChange, value } }) => (
            <>
              <Pressable
                style={[styles.input, errors.date && styles.errorInput]}
                onPress={() => {
                  setPickerMode("date");
                  setDateModalVisible(true);
                }}
              >
                <Text style={{ color: value ? "#000" : "#888" }}>
                  {value || "Pilih Tanggal & Jam"}
                </Text>
              </Pressable>

              {/* Modal DateTime */}
              <Modal
                transparent
                visible={dateModalVisible}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.dateModalContent}>
                    <Text style={styles.modalTitle}>
                      {pickerMode === "date" ? "Pilih Tanggal" : "Pilih Jam"}
                    </Text>

                    <DateTimePicker
                      value={tempDate}
                      mode={pickerMode}
                      display="spinner"
                      minimumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) setTempDate(selectedDate);
                      }}
                    />

                    <View style={styles.modalButtonRow}>
                      {pickerMode === "time" ? (
                        <>
                          <TouchableOpacity
                            style={[
                              styles.modalBtn,
                              { backgroundColor: "#ccc" },
                            ]}
                            onPress={() => setDateModalVisible(false)}
                          >
                            <Text style={{ color: "#333" }}>Batal</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.modalBtn,
                              { backgroundColor: "#2F80ED" },
                            ]}
                            onPress={() => {
                              onChange(formatDateTime(tempDate));
                              setDateModalVisible(false);
                            }}
                          >
                            <Text style={{ color: "white" }}>Simpan</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <TouchableOpacity
                          style={[
                            styles.modalBtn,
                            { backgroundColor: "#2F80ED", width: "100%" },
                          ]}
                          onPress={() => setPickerMode("time")}
                        >
                          <Text style={{ color: "white" }}>
                            Lanjut Pilih Jam
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />
        {errors.date && (
          <Text style={styles.errorText}>{errors.date.message}</Text>
        )}

        <Text style={styles.label}>Poli</Text>
        <Controller
          control={control}
          name="poli"
          render={({ field: { onChange, value } }) => (
            <>
              <Pressable
                style={[
                  styles.input,
                  errors.poli && styles.errorInput,
                  id && { backgroundColor: "#f2f2f2" },
                ]}
                disabled={!!id}
                onPress={() => !id && setModalVisible(true)}
              >
                <Text style={{ color: value ? "#000" : "#888" }}>
                  {value
                    ? poliList?.find((p) => String(p.id) === value)?.nama_poli
                    : "Pilih Poli"}
                </Text>
              </Pressable>

              {/* Modal Pilih Poli (jika tidak ada param id) */}
              {!id && (
                <Modal visible={modalVisible} transparent animationType="slide">
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Pilih Poli</Text>

                      {isLoading ? (
                        <ActivityIndicator size="large" color="#2F80ED" />
                      ) : (
                        <FlatList
                          data={poliList ?? []}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.optionItem}
                              onPress={() => {
                                onChange(String(item.id));
                                setModalVisible(false);
                              }}
                            >
                              <Text style={styles.optionText}>
                                {item.nama_poli}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      )}

                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={styles.closeText}>Tutup</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              )}
            </>
          )}
        />
        {errors.poli && (
          <Text style={styles.errorText}>{errors.poli.message}</Text>
        )}

        {/* Keluhan */}
        <Text style={styles.label}>Keluhan</Text>
        <Controller
          control={control}
          name="complaint"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Tuliskan keluhan pasien"
              style={[
                styles.input,
                styles.textarea,
                errors.complaint && styles.errorInput,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />
        {errors.complaint && (
          <Text style={styles.errorText}>{errors.complaint.message}</Text>
        )}

        {/* Tombol Submit */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Ambil Antrian</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// 💅 Style
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontWeight: "600", color: "#000", marginBottom: 4, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#2F80ED",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  textarea: { minHeight: 80 },
  errorInput: { borderColor: "red" },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
  errorText: { color: "red", fontSize: 12, marginTop: 2 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  dateModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2F80ED",
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  optionItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { fontSize: 16, color: "#333" },
  closeButton: {
    marginTop: 12,
    backgroundColor: "#2F80ED",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "white", fontWeight: "600" },
});
