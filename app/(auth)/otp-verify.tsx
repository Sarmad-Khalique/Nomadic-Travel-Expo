import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppButton from '../../components/Button';
import { COLORS } from '../../constants/colors';
import { OTPFormData } from '../../types';
import { otpSchema } from '../../validation/otpSchema';

export default function OtpVerificationScreen() {
  const router = useRouter();
  const otpInputRefs = useRef<Array<TextInput | null>>([]);

  const { control, handleSubmit, watch } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const otpValues = watch('otp');

  const onSubmit = (data: OTPFormData) => {
    console.log('OTP Data:', data);
    // Handle the OTP verification logic here
    Keyboard.dismiss();
  };

  const handleOtpChange = (text: string, index: number, onChange: (text: string) => void) => {
    onChange(text);
    
    // Auto-focus to next input
    if (text && index < 4) {
      otpInputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when last digit is entered
    if (text && index === 4) {
      handleSubmit(onSubmit)();
    }
  };

  const handleKeyPress = ({ nativeEvent }: any, index: number) => {
    if (nativeEvent.key === 'Backspace' && !otpValues?.[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
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
      <View className="w-full">
        <Text className="text-[24px] leading-[36px] font-merriweather-bold text-black text-left">
          OTP Verification
        </Text>
        <Text className="text-[15px] leading-[20px] font-poppins-regular text-black mt-1 text-left">
          Please enter the 5-digit code sent to your email
        </Text>
      </View>

      {/* OTP Fields */}
      <View className="mt-6 w-full flex-row justify-between space-x-4">
        {[...Array(5)].map((_, index) => (
          <Controller
            key={index}
            control={control}
            name={`otp.${index}`}
            render={({ field: { onChange, value } }) => (
              <TextInput
                ref={(ref) => {
                  otpInputRefs.current[index] = ref;
                }}
                placeholder="-"
                placeholderTextColor={COLORS.text}
                keyboardType="numeric"
                maxLength={1}
                className="w-12 h-12 border border-text rounded-lg text-black text-lg"
                style={{ textAlign: 'left', paddingLeft: 14 }}
                value={value}
                onChangeText={(text) => handleOtpChange(text, index, onChange)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onSubmitEditing={() => {
                  if (index < 4) {
                    otpInputRefs.current[index + 1]?.focus();
                  } else {
                    handleSubmit(onSubmit)();
                  }
                }}
                blurOnSubmit={false}
                returnKeyType={index === 4 ? 'done' : 'next'}
                autoFocus={index === 0}
                selectionColor={COLORS.primary}
              />
            )}
          />
        ))}
      </View>

      {/* Submit Button */}
      <AppButton
        title="Verify"
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="primary"
        className="mt-6"
      />

      {/* Resend OTP Link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-black font-poppins-regular">
          I don't have code?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('./resend-otp')}>
          <Text className="text-complementary underline font-poppins-regular">
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}