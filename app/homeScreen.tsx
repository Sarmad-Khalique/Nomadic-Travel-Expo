// app/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/Button";
import AppSpecialList from "../components/homeScreen/AppSpecialList";
import CategorySelector from "../components/homeScreen/CategorySelector";
import LocationMap from "../components/homeScreen/LocationMap";
import PackageCard from "../components/homeScreen/PackageCard";
import RecommendedPackageCard from "../components/homeScreen/RecommendedPackageCard";
import Sidebar from "../components/sidebar/Sidebar";
import { useDestinations } from "../lib/react-query/destination";
import { useHomeStore } from "../store/homeStore";
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

// Static destination data for testing
const staticDestinations: Destination[] = [
  {
    id: 1,
    name: "The Pink Beach",
    location: "Komodo Island, Indonesia",
    location_url: "https://maps.google.com/?q=-8.5833,119.4333",
    description: "Beautiful pink sand beach with crystal clear waters",
    price: "$48/Person",
    rating: "4.1",
    facilities: [{ id: 1, name: "Beach Access" }, { id: 2, name: "Snorkeling" }],
    categories: [{ id: 1, name: "Beach" }, { id: 2, name: "Island" }],
    images: [{ id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" }]
  },
  {
    id: 2,
    name: "Mountain Paradise",
    location: "Swiss Alps, Switzerland",
    location_url: "https://maps.google.com/?q=46.8182,8.2275",
    description: "Stunning mountain views and hiking trails",
    price: "$120/Person",
    rating: "4.8",
    facilities: [{ id: 3, name: "Hiking Trails" }, { id: 4, name: "Cable Car" }],
    categories: [{ id: 3, name: "Mountain" }, { id: 4, name: "Adventure" }],
    images: [{ id: 2, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" }]
  },
  {
    id: 3,
    name: "Desert Adventure",
    location: "Sahara Desert, Morocco",
    location_url: "https://maps.google.com/?q=31.7917,-7.0926",
    description: "Experience the vast Sahara desert landscape",
    price: "$75/Person",
    rating: "4.3",
    facilities: [{ id: 5, name: "Camel Tours" }, { id: 6, name: "Desert Camp" }],
    categories: [{ id: 5, name: "Desert" }, { id: 6, name: "Cultural" }],
    images: [{ id: 3, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" }]
  },
  {
    id: 4,
    name: "Tropical Island",
    location: "Maldives Islands",
    location_url: "https://maps.google.com/?q=3.2028,73.2207",
    description: "Paradise island with overwater bungalows",
    price: "$200/Person",
    rating: "4.9",
    facilities: [{ id: 7, name: "Overwater Bungalows" }, { id: 8, name: "Diving" }],
    categories: [{ id: 7, name: "Island" }, { id: 8, name: "Luxury" }],
    images: [{ id: 4, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" }]
  }
];

const HomeScreen = () => {
  const { setHomeData } = useHomeStore();
  const [activeTab, setActiveTab] = useState<"Solo Trips" | "Family Trips">(
    "Solo Trips"
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { data, isLoading, isError } = useDestinations();

  useEffect(() => {
    if (data) {
      setHomeData(data as Destination[]);
    }
  }, [data, setHomeData]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="px-6 pt-4 pb-20">
          {/* Header Section */}
                       <View className="flex-row items-center justify-between mb-6">
               <TouchableOpacity className="mr-4" onPress={() => setIsSidebarVisible(true)}>
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
            <View className="flex-row items-center bg-white rounded-xl px-4 py-0 mb-4 shadow-sm">
              <Text className="text-xl mr-2">🔍</Text>
              <TextInput 
                className="text-gray-700 flex-1"
                placeholder="Find things to do"
                placeholderTextColor="#9CA3AF"
                style={{ fontSize: 15 }}
              />
            </View>
          {/* Category Selector */}
          <CategorySelector />

          {/* Destinations Banner */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[24px] font-merriweather-bold text-black">Best Destination</Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-semibold">View all</Text>
              </TouchableOpacity>
            </View>
            {/* Dynamic loading logic - commented for later use */}
            {/* {isLoading ? (
              <View className="py-8 items-center justify-center">
                <ActivityIndicator size="large" color={COLORS.primary} />
              </View>
            ) : isError ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
                contentContainerStyle={{ gap: 16 }}
              >
                {staticDestinations.map((destination, index) => (
                  <PackageCard key={index} packageData={destination} />
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2"
                contentContainerStyle={{ gap: 16 }}
              >
                {(data as Destination[])?.map((destination: Destination, index: number) => (
                  <PackageCard key={index} packageData={destination} />
                ))}
              </ScrollView>
            )} */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              contentContainerStyle={{ gap: 16 }}
            >
              {staticDestinations.map((destination, index) => (
                <PackageCard key={index} packageData={destination} />
              ))}
            </ScrollView>
          </View>

          {/* Recommended Packages */}
          <View className="mt-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-[24px] font-bold text-black">
                Recommended Package
              </Text>
              <TouchableOpacity>
                <Text className="text-red-500 font-semibold">View all</Text>
              </TouchableOpacity>
            </View>
            {/* Tabs */}
            <View className="flex-row mb-2 bg-gray-200 rounded-full p-1">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full flex-1 ${
                  activeTab === "Solo Trips" ? "bg-red-500" : "bg-transparent"
                }`}
                onPress={() => setActiveTab("Solo Trips")}
              >
                <Text
                  className={`${
                    activeTab === "Solo Trips" ? "text-white" : "text-red-400"
                  } font-semibold text-center`}
                >
                  Solo Trips
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`px-4 py-2 rounded-full flex-1 ${
                  activeTab === "Family Trips" ? "bg-red-500" : "bg-transparent"
                }`}
                onPress={() => setActiveTab("Family Trips")}
              >
                <Text
                  className={`${
                    activeTab === "Family Trips" ? "text-white" : "text-red-400"
                  } font-semibold text-center`}
                >
                  Family Trips
                </Text>
              </TouchableOpacity>
            </View>
                        <View className="flex-row flex-wrap justify-between">
              {/* Dynamic API data - commented for later use */}
              {/* {(data as Destination[])
                ?.slice(0, 4)
                .map((destination: Destination, index: number) => (
                  <View key={index} style={{ width: "48%", marginBottom: 12 }}>
                    <RecommendedPackageCard packageData={destination} />
                  </View>
                ))} */}
              {staticDestinations
                .slice(0, 4)
                .map((destination, index) => (
                  <View key={index} style={{ width: "48%", marginBottom: 12 }}>
                    <RecommendedPackageCard packageData={destination} />
                  </View>
                ))}
            </View>
          </View>

          {/* Location Map */}
          <LocationMap />

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
      
      {/* Sidebar */}
      <Sidebar 
        isVisible={isSidebarVisible} 
        onClose={() => setIsSidebarVisible(false)} 
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
