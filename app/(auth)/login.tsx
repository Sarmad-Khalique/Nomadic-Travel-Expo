import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppButton from "../../components/Button";
import { COLORS } from "../../constants/colors";
import { useLogin } from "../../lib/react-query/auth";
import { useAuthStore } from "../../store/authStore";
import { LoginFormData } from "../../types";
import { loginSchema } from "../../validation/loginSchema";

export default function LoginScreen() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { showPassword, togglePassword, setTokens } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: (
        response: AxiosResponse<{ access: string; refresh: string }>
      ) => {
        setTokens(response.data.access, response.data.refresh);
        Alert.alert("Login Successful", "Welcome back!");
        router.replace("/");
      },
      onError: (err: any) => {
        const msg =
          err?.response?.data?.detail ||
          "Invalid email or password. Try again.";
        Alert.alert("Login Failed", msg);
      },
    });
  };

  return (
    <View className="flex-1 bg-background px-6 pt-14">
      <StatusBar style="dark" />

      {/* Logo */}
      <View className="items-center">
        <Image
          source={require("../../assets/images/auth/logo.png")}
          className="w-[168px] h-[155px] mb-4"
          resizeMode="contain"
        />
      </View>

      {/* Heading */}
      <View className="w-full">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black text-left">
          Welcome Travelling
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1 text-left">
          Please sign in to continue our app
        </Text>
      </View>

      {/* Form Fields */}
      <View className="mt-6 w-full space-y-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor={COLORS.text}
                className={`border mb-1 border-text rounded-lg px-4 py-3 text-black ${
                  errors.email ? "border-red-500" : ""
                }`}
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mb-3">
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        />

        <View className="relative">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={COLORS.text}
                  secureTextEntry={!showPassword}
                  className={`border border-text rounded-lg px-4 py-3 text-black pr-12 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={togglePassword}
          >
            <Image
              source={require("../../assets/images/auth/Icon.png")}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        className="self-end mt-2 mb-4"
        onPress={() => router.push("./forget-password")}
      >
        <Text className="text-[12px] text-complementary underline font-poppins-regular">
          Forget password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <AppButton
        title="Login"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mb-6"
        isLoading={isPending}
        disabled={isPending}
      />

      {/* Divider */}
      <View className="flex-row items-center justify-center w-full mb-4">
        <View className="flex-1 h-[1px] bg-shadow" />
        <Text className="mx-2 text-black">OR</Text>
        <View className="flex-1 h-[1px] bg-shadow" />
      </View>

      {/* Social Buttons */}
      <AppButton
        title="Login with Google"
        size="md"
        variant="outline"
        className="mb-4"
        iconLeft={require("../../assets/images/auth/googleIcon.png")}
      />
      <AppButton
        title="Login with Facebook"
        size="md"
        variant="outline"
        iconLeft={require("../../assets/images/auth/facebookIcon.png")}
      />

      {/* Register Navigation */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-black font-poppins-regular">
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.push("./register")}>
          <Text className="text-complementary underline font-poppins-regular">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
