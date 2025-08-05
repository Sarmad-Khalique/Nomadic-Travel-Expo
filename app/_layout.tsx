import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { queryClient } from '../lib/react-query/queryClient'; // ✅ make sure this file exists
import './globals.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Merriweather-Bold': require('../assets/fonts/Merriweather-Bold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2EC4B6" />
        <Text className="mt-4 text-gray-700">Loading fonts...</Text>
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
