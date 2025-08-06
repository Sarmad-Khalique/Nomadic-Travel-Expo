import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur"; // 👈 Add this
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Text, TextInput, View } from "react-native";

import AppButton from "../../components/Button";
import SuccessModal from "../../components/SuccessModal";
import { COLORS } from "../../constants/colors";
import { useSendResetPasswordLink } from "../../lib/react-query/auth";
import { ForgetPasswordData } from "../../types";
import { forgotPasswordSchema } from "../../validation/forgotPasswordSchema";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate: sendResetLink, isPending } = useSendResetPasswordLink();

  const onSubmit = (data: ForgetPasswordData) => {
    sendResetLink(data, {
      onSuccess: () => {
        setModalVisible(true);
      },
      onError: () => {
        // Optional: show error toast or alert
      },
    });
  };

  // Main screen content to be blurred
  const Content = (
    <View className="px-6 pt-14 flex-1">
      <View className="items-center mb-4">
        <Image
          source={require("../../assets/images/auth/logo.png")}
          className="w-[168px] h-[155px]"
          resizeMode="contain"
        />
      </View>

      <View className="w-full mb-2">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black">
          Forgot Password
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1">
          Enter Email to Reset your Password
        </Text>
      </View>

      <View className="mt-6 w-full space-y-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Your Email"
              placeholderTextColor={COLORS.text}
              className="border border-text rounded-lg px-4 py-3 text-black"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      <AppButton
        title="Reset Password"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mt-6"
        isLoading={isPending}
        disabled={isPending}
      />

      <AppButton
        title="Test Success Modal"
        onPress={() => setModalVisible(true)}
        size="md"
        variant="secondary"
        className="mt-4"
      />
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />

      {/* Blur the screen behind modal */}
      {modalVisible ? (
        <BlurView intensity={30} tint="light" className="flex-1">
          {Content}
        </BlurView>
      ) : (
        Content
      )}

      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Check your email"
        message="We have sent password recovery instruction to your email"
        icon={require("../../assets/images/auth/checkMail.png")}
      />
    </View>
  );
}
