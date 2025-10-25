import { useCreatePasien } from "@/services/query/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const registerSchema = z
  .object({
    phone: z
      .string()
      .min(10, { message: "Nomor HP minimal 10 digit" })
      .regex(/^(\+62|62|0)\d{9,13}$/, { message: "Nomor HP tidak valid" }),
    name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Konfirmasi password wajib diisi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { mutate, isPending } = useCreatePasien();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutate(
      {
        no_hp: data.phone,
        nama: data.name,
        password: data.password,
      },
      {
        onSuccess: async (res) => {
          try {
            // Jika backend kasih token, bisa disimpan

            Alert.alert("✅ Registrasi Berhasil", "Akun berhasil dibuat!");
            router.replace("/login"); // Redirect ke login page
          } catch (err) {
            console.error("Gagal menyimpan token:", err);
          }
        },
        onError: (error: any) => {
          console.error("Register error:", error);

          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Gagal registrasi. Periksa koneksi dan coba lagi.";

          Alert.alert("❌ Registrasi Gagal", message);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.image}
        />
      </View>

      {/* No HP */}
      <Text style={styles.label}>No. Hp</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Input Nomor Hp"
            style={[styles.input, errors.phone && styles.errorInput]}
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.phone && (
        <Text style={styles.errorText}>{errors.phone.message}</Text>
      )}

      {/* Nama */}
      <Text style={styles.label}>Nama</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Input Nama"
            style={[styles.input, errors.name && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Input Password"
            secureTextEntry
            style={[styles.input, errors.password && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      {/* Konfirmasi Password */}
      <Text style={styles.label}>Konfirmasi Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Konfirmasi Password"
            secureTextEntry
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Button */}
      <TouchableOpacity
        style={[styles.button, isPending && { opacity: 0.7 }]}
        disabled={isPending}
        onPress={handleSubmit(onSubmit)}
      >
        {isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Daftar</Text>
        )}
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>
        Sudah Punya Akun?{" "}
        <Text style={styles.link} onPress={() => router.replace("/login")}>
          Login sekarang
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F80ED",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#2F80ED",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    textAlign: "center",
    color: "#888",
    marginTop: 14,
  },
  link: {
    color: "#2F80ED",
    fontWeight: "500",
  },
});
