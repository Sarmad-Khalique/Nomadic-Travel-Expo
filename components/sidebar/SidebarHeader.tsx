import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SidebarHeaderProps } from '../../types';

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
  return (
    <View className="px-4 py-2 ">
      <View className="flex-row items-center justify-between">
        
        <TouchableOpacity onPress={onClose} className="p-2">
          <Image
            source={require('../../assets/images/home/Menu.png')}
            className="w-8 h-8"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SidebarHeader;
