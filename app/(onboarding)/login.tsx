import { useLogin } from "@/services/query/mutation";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Nomor HP minimal 10 digit")
    .regex(/^[0-9]+$/, "Hanya boleh angka"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { setToken, setUser } = useAuthStore.getState();
  const { mutate, isPending } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(
      { no_hp: data.phone, password: data.password },
      {
        onSuccess: async (res) => {
          try {
            setToken(res?.data?.token ?? "");
            setUser({
              role: res?.data?.role,
              userId: res?.data?.id,
              numberPhone: data.phone,
            });
            router.replace("/");
          } catch (err) {
            console.error("Gagal menyimpan token:", err);
          }
        },
        onError: (error: any) => {
          console.log("Login error:", error);
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Gagal login. Periksa koneksi dan coba lagi.";
          Alert.alert("Login Gagal", message);
        },
      }
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.image}
      />

      {/* Form */}
      <View style={styles.form}>
        {/* No HP */}
        <Text style={styles.label}>No. Hp</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Input Nomor Hp"
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

        {/* Password */}
        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Input Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, isPending && { opacity: 0.7 }]}
          activeOpacity={0.8}
          disabled={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Masuk</Text>
          )}
        </TouchableOpacity>

        {/* Register link */}
        <Text style={styles.registerText}>
          Belum Punya Akun?{" "}
          <Text
            onPress={() => router.navigate("/register")}
            style={styles.registerLink}
          >
            Register sekarang
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  form: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
    marginTop: 16,
    color: "#9CA3AF",
  },
  registerLink: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});
