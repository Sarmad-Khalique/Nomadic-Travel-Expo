import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SidebarMenuItemProps } from '../../types';

// Icon mapping to avoid dynamic require
const getIconSource = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'home-icon.png': require('../../assets/images/sidebar/home-icon.png'),
    'flight.png': require('../../assets/images/sidebar/flight.png'),
    'Walking.png': require('../../assets/images/sidebar/Walking.png'),
    'Mountain.png': require('../../assets/images/sidebar/Mountain.png'),
    'Heart.png': require('../../assets/images/sidebar/Heart.png'),
    'Chat Settings.png': require('../../assets/images/sidebar/Chat Settings.png'),
    'About.png': require('../../assets/images/sidebar/About.png'),
    'logout.png': require('../../assets/images/sidebar/logout.png'),
  };
  return iconMap[iconName] || require('../../assets/images/sidebar/home-icon.png');
};

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item, onPress, onSubItemPress }) => {
  const isLogout = item.id === 'logout';
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isActiveParent = hasSubItems && item.isExpanded && item.isActive;
  const isActiveItem = item.isActive && !hasSubItems;

  const MenuItemContent = () => (
    <View className="flex-row items-center py-2 px-3 rounded-full" style={{ width: 300, height: 36 }}>
      <Image
        source={getIconSource(item.icon)}
        className="w-5 h-5 mr-3"
        resizeMode="contain"
        style={{
          tintColor: isActiveParent || isActiveItem ? '#FFFFFF' : '#000000'
        }}
      />
      <Text 
        className={`flex-1 font-medium ${
          isLogout ? 'text-red-500' : isActiveParent || isActiveItem ? 'text-white' : 'text-black'
        }`}
      >
        {item.title}
      </Text>
      {hasSubItems && (
        <Text className={`text-base font-bold ${isActiveParent ? 'text-white' : 'text-black'}`}>
          {item.isExpanded ? 'v' : '>'}
        </Text>
      )}
    </View>
  );

  return (
    <View className="mb-1">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {isActiveParent || isActiveItem ? (
          <LinearGradient
            colors={['#38ADA7', '#B2DFDB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-full"
            style={{ width: 300, height: 36 }}
          >
            <MenuItemContent />
          </LinearGradient>
        ) : (
          <MenuItemContent />
        )}
      </TouchableOpacity>

      {/* Sub-items */}
      {hasSubItems && item.isExpanded && (
        <View className="ml-8 mt-2">
          {item.subItems?.map((subItem, index) => (
            <View key={subItem.id}>
              <TouchableOpacity
                onPress={() => onSubItemPress(subItem.id)}
                className="py-2 px-3"
              >
                <Text 
                  className={`text-sm ${
                    subItem.isActive ? 'text-sidebar-active-subitem' : 'text-black'
                  }`}
                >
                  {subItem.title}
                </Text>
              </TouchableOpacity>
              {index < (item.subItems?.length || 0) - 1 && (
                <View className="h-px bg-gray-200 mx-3" />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SidebarMenuItem;
