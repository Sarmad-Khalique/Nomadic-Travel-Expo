import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PackageCardProps } from '../../types/homeScreen';

const RecommendedPackageCard: React.FC<PackageCardProps> = ({ packageData }) => (
  <TouchableOpacity>
    <View className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Image Section */}
      <View className="relative">
        <Image
          source={{ uri: packageData.images[0]?.image }}
          className="w-full h-32"
          resizeMode="cover"
        />
        {/* Duration Badge */}
        <View className="absolute bottom-2 right-2 bg-green-500 rounded-lg px-2 py-1">
          <Text className="text-white text-xs font-semibold">4N/5D</Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="p-3 bg-white">
        {/* Title */}
        <Text className="text-base font-bold text-black mb-1" numberOfLines={1}>
          {packageData.name}
        </Text>
        
        {/* Hot Deal Badge */}
        <View className="flex-row items-center">
          <Text className="text-yellow-500 mr-1">⚡</Text>
          <Text className="text-yellow-600 text-sm font-medium">Hot Deal</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default RecommendedPackageCard;
