import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AppButton from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { useRegister } from '../../lib/react-query/auth';
import { useAuthStore } from '../../store/authStore';
import { RegisterFormData } from '../../types';
import { registerSchema } from '../../validation/registerSchema';

export default function RegisterScreen() {
  const router = useRouter();
  const { showPassword, togglePassword } = useAuthStore();
  const { mutate: register, isPending } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
  const payload = {
    email: data.email,
    password: data.password,
    full_name: data.fullName, // ✅ API expects this
  };

  register(payload, {
    onSuccess: () => {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/');
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.email?.[0] ||
        error?.response?.data?.full_name?.[0] ||
        error?.response?.data?.password?.[0] ||
        'Registration failed. Please try again.';
      Alert.alert('Registration Failed', msg);
    },
  });
};


  return (
    <View className="flex-1 bg-background px-6 pt-14">
      <StatusBar style="dark" />

      {/* Logo */}
      <View className="items-center">
        <Image
          source={require('../../assets/images/auth/logo.png')}
          className="w-[168px] h-[155px] mb-4"
          resizeMode="contain"
        />
      </View>

      {/* Heading */}
      <View className="w-full">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black text-left">
          Let’s Join With Us to
        </Text>
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black text-left -mt-1">
          Around the World
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1 text-left">
          Please fill the details and create account
        </Text>
      </View>

      {/* Form Fields */}
      <View className="mt-6 w-full space-y-4">
        {/* Full Name */}
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={COLORS.text}
                className="border mb-1 border-text rounded-lg px-4 py-3 text-black"
                value={value}
                onChangeText={onChange}
              />
              {errors.fullName && (
                <Text className="text-red-500 text-xs ml-1 mb-2">
                  {errors.fullName.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor={COLORS.text}
                className="border mb-1 border-text rounded-lg px-4 py-3 text-black"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              {errors.email && (
                <Text className="text-red-500 text-xs ml-1 mb-2">
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Password */}
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
                  className="border border-text rounded-lg px-4 py-3 text-black pr-12"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.password && (
                  <Text className="text-red-500 text-xs ml-1 mt-1">
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
              source={require('../../assets/images/auth/Icon.png')}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Register Button */}
      <AppButton
        title="Register"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mt-6 mb-6"
        isLoading={isPending}
        disabled={isPending}
      />

      {/* Terms Text */}
      <Text className="mt-16 text-center text-text font-poppins-regular px-2">
        By clicking Register, you are agree to our regulation of{' '}
        <Text className="underline text-black font-poppins-regular">
          Terms and Privacy
        </Text>
      </Text>
    </View>
  );
}
