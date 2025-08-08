// components/homeScreen/PackageCard.tsx
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PackageCardProps } from '../../types/homeScreen';

const PackageCard: React.FC<PackageCardProps> = ({ packageData }) => (
  <TouchableOpacity className="mr-4 mb-4">
    <View className="bg-white rounded-xl border border-blue-200 overflow-hidden" style={{ width: 268, height: 384 }}>
      {/* Image Section */}
      <View className="relative">
        <Image 
          source={{ uri: packageData.images[0]?.image }} 
          className="w-full h-80"
          resizeMode="cover"
        />
        {/* Bookmark Icon */}
        <TouchableOpacity className="absolute top-3 right-3">
          <View className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-sm">
            <Text className="text-lg">🔖</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Content Section */}
      <View className="p-4 bg-white">
        {/* Title and Rating Row */}
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-semibold text-black flex-1 mr-2" numberOfLines={2}>
            {packageData.name}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-yellow-500 mr-1">⭐</Text>
            <Text className="text-black font-semibold">{packageData.rating}</Text>
          </View>
        </View>
        
        {/* Location and Price Row */}
        <View className="flex-row justify-between items-start">
          <View className="flex-row items-start flex-1 mr-2">
            <Text className="text-red-500 mr-1 mt-0.5">📍</Text>
            <Text className="text-red-500 font-medium flex-1" numberOfLines={2}>
              {packageData.location}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-black font-bold text-lg">${packageData.price.replace('$', '').replace('/Person', '')}</Text>
            <Text className="text-gray-500 ml-1">/Person</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default PackageCard;
