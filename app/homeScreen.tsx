// app/HomeScreen.tsx
import { COLORS } from "@/constants/colors";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/Button";
import AppSpecialList from "../components/homeScreen/AppSpecialList";
import CategorySelector from "../components/homeScreen/CategorySelector";
import PackageCard from "../components/homeScreen/PackageCard";
import { useDestinations } from "../lib/react-query/destination"; // React Query hook for fetching data
import { useHomeStore } from "../store/homeStore"; // Import the Zustand store
import { Destination } from "../types/homeScreen";

// Utility to extract lat/lng from Google Maps URL
function extractLatLng(
  url: string
): { latitude: number; longitude: number } | null {
  // Example: https://maps.google.com/?q=31.5497,74.3436
  const match = url.match(/q=([\d.-]+),([\d.-]+)/);
  if (match) {
    return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }
  return null;
}

const HomeScreen = () => {
  const { setHomeData } = useHomeStore(); // Access the store action
  const [activeTab, setActiveTab] = useState<"Solo Trips" | "Family Trips">(
    "Solo Trips"
  );

  const { data, isLoading, isError } = useDestinations(); // React Query hook for fetching data

  useEffect(() => {
    if (data) {
      setHomeData(data); // Update the state with the fetched data
    }
  }, [data]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4 pb-20">
          {/* Header Section */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity className="mr-4">
              {/* Menu Icon */}
              <Image
                source={require("../assets/images/home/Menu.png")}
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="flex-row items-center flex-1 justify-center">
              <Image
                source={require("../assets/images/home/Location icon.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="text-base text-gray-500">Lahore, Pakistan</Text>
            </View>
            <TouchableOpacity>
              {/* Profile Icon (placeholder) */}
              <View className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center">
                <Text className="text-lg font-bold text-white">A</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Discover Banner Section */}
          <View className="mt-2 mb-4 relative h-32 w-full">
            <Image
              source={require("../assets/images/onboarding/onboarding1.jpg")}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
            <View className="absolute inset-0 rounded-lg justify-center items-center">
              <Image
                source={require("../assets/images/home/DiscoverGradient.png")}
                className="absolute inset-0 w-full h-full rounded-lg opacity-80 "
                resizeMode="cover"
              />
              <View className="w-64 h-20 items-start">
                <Text className="text-2xl font-merriweather-regular text-white text-left leading-8">
                  Discover the wonders{"\n"}of the{" "}
                  <Text className="text-red-500 font-merriweather-regular">
                    world!
                  </Text>
                </Text>
                <View className="relative mt-1">
                  <ImageBackground
                    source={require("../assets/images/home/vector.png")}
                    resizeMode="contain"
                    className="absolute bottom-[-2px] left-[-20px] h-2 w-full"
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Search Bar */}
          <View className="flex-row items-center bg-white rounded-xl px-4 py-2 mb-4 shadow-sm">
            <Text className="text-xl mr-2">🔍</Text>
            <Text className="text-gray-400 flex-1">Find things to do</Text>
          </View>
          {/* Category Selector */}
          <CategorySelector />

          {/* Destinations Banner */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[24px] font-merriweather-regular text-black">Best Destination</Text>
              <TouchableOpacity>
                <Text className="text-primary font-semibold">See all</Text>
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : isError ? (
              <View className="py-8 items-center justify-center">
                <Text className="text-red-600">Error loading destinations</Text>
              </View>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
                contentContainerStyle={{ gap: 16 }}
              >
                {data?.map((destination: Destination, index: number) => (
                  <PackageCard key={index} packageData={destination} />
                ))}
              </ScrollView>
            )}
          </View>

          {/* Recommended Packages */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[24px] font-bold text-black">
                Recommended Package
              </Text>
              <TouchableOpacity>
                <Text className="text-primary font-semibold">See all</Text>
              </TouchableOpacity>
            </View>
            {/* Tabs */}
            <View className="flex-row mb-2">
              <TouchableOpacity
                className={`px-4 py-2 rounded-l-full ${
                  activeTab === "Solo Trips" ? "bg-primary" : "bg-gray-200"
                }`}
                onPress={() => setActiveTab("Solo Trips")}
              >
                <Text
                  className={`${
                    activeTab === "Solo Trips" ? "text-white" : "text-gray-500"
                  } font-semibold`}
                >
                  Solo Trips
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-4 py-2 rounded-r-full ml-2 ${
                  activeTab === "Family Trips" ? "bg-primary" : "bg-gray-200"
                }`}
                onPress={() => setActiveTab("Family Trips")}
              >
                <Text
                  className={`${
                    activeTab === "Family Trips" ? "text-white" : "text-gray-500"
                  } font-semibold`}
                >
                  Family Trips
                </Text>
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : isError ? (
              <View className="py-8 items-center justify-center">
                <Text className="text-red-600">Error loading destinations</Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {data
                  ?.slice(0, 4)
                  .map((destination: Destination, index: number) => (
                    <View key={index} style={{ width: "48%", marginBottom: 12 }}>
                      <PackageCard packageData={destination} />
                    </View>
                  ))}
              </View>
            )}
          </View>

          {/* Map Section */}
          <View className="mt-4 rounded-xl overflow-hidden" style={{ height: 220 }}>
            {isLoading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : isError ? (
              <View className="flex-1 items-center justify-center">
                <Text className="text-red-600">Error loading destinations</Text>
              </View>
            ) : (
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: 31.5497, // Default to Lahore
                  longitude: 74.3436,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
                }}
              >
                {data?.map((destination: Destination, idx: number) => {
                  const coords = extractLatLng(destination.location_url);
                  if (!coords) return null;
                  return (
                    <Marker
                      key={idx}
                      coordinate={coords}
                      title={destination.name}
                      description={destination.location}
                    />
                  );
                })}
              </MapView>
            )}
          </View>

          {/* Explore More Button */}
          <AppButton
            title="Explore More"
            size="md"
            variant="primary"
            className="mt-6"
          />

          {/* App Special Section */}
          <AppSpecialList className="mt-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
