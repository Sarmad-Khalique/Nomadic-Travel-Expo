import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TextInput, View } from 'react-native';
import AppButton from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { useSendVerificationEmail } from '../../lib/react-query/auth';
import { VerificationFormData } from '../../types';
import { verificationSchema } from '../../validation/verificationSchema';

export default function AccountVerificationScreen() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
  });

  const { mutate: sendVerificationEmail, isPending } = useSendVerificationEmail();

  const onSubmit = (data: VerificationFormData) => {
    sendVerificationEmail(data, {
      onSuccess: () => {
        router.push('/'); // redirect to success screen or show success modal
      },
      onError: (error) => {
        console.error('Error sending verification email:', error);
      },
    });
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

      {/* Heading */}
      <View className="w-full mb-2">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black">
          Verification Account
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1">
          We will send a one-time password to your email
        </Text>
      </View>

      {/* Form Fields */}
      <View className="mt-6 w-full space-y-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Your Email"
              placeholderTextColor={COLORS.text}
              className="border mb-5 border-text rounded-lg px-4 py-3 text-black"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
      </View>

      {/* Send Button */}
      <AppButton
        title="Send"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mt-6"
        isLoading={isPending}
        disabled={isPending}
      />
    </View>
  );
}
