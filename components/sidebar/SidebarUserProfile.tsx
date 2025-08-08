import React from 'react';
import { Image, Text, View } from 'react-native';
import { UserProfile } from '../../types/sidebar';

interface SidebarUserProfileProps {
  userProfile: UserProfile;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ userProfile }) => {
  return (
    <View className="px-4 py-4 ">
      <View className="flex-row items-center">
        <View className="relative">
          <Image
            source={{ uri: userProfile.profileImage }}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
          <View className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-black font-bold text-base">{userProfile.name}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-green-500 mr-1">📍</Text>
            <Text className="text-gray-500 text-sm">{userProfile.location}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SidebarUserProfile;
