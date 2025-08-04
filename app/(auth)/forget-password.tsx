import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import {
    Image,
    Text,
    TextInput,
    View
} from 'react-native';

import AppButton from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { ForgotPasswordFormData } from '../../types';
import { forgotPasswordSchema } from '../../validation/forgotPasswordSchema';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log('Reset Email:', data);
    
  };

  return (
    <View className="flex-1 bg-background px-6 pt-14">
      <StatusBar style="dark" />

      {/* Logo */}
      <View className="items-center mb-4">
        <Image
          source={require('../../assets/images/auth/logo.png')}
          className="w-[168px] h-[155px]"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <View className="w-full mb-2">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black">
          Forgot Password
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1">
          Enter Email to Reset your Password
        </Text>
      </View>

      {/* Form */}
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
            />
          )}
        />
      </View>

      {/* Button */}
      <AppButton
        title="Reset Password"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mt-6"
      />
    </View>
  );
}
