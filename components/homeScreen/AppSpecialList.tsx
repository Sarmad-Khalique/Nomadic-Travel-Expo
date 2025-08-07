import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

interface AppSpecialListProps {
  className?: string;
}

const specials = [
  {
    icon: require('../../assets/images/home/SafetyIsureIcon.png'),
    title: 'Safety Insured',
    description: 'There are many variants of lorem ipsum.'
  },
  {
    icon: require('../../assets/images/home/BecomeSponsorIcon.png'),
    title: 'Become a Sponsor',
    description: 'There are many variants of lorem ipsum.'
  },
  {
    icon: require('../../assets/images/home/24-hours-call-icon.png'),
    title: '24X7 Help & Support',
    description: 'There are many variants of lorem ipsum.'
  }
];

const AppSpecialList: React.FC<AppSpecialListProps> = ({ className }) => (
  <View className={className}>
    <Text className="text-xl font-bold mb-4">App Special</Text>
    {specials.map((item, idx) => (
      <View key={idx}>
        <View className="flex-row items-center p-3 mb-2">
          <ImageBackground
            source={require('../../assets/images/home/AppSpecialBg.png')}
            className="w-12 h-12 mr-3 items-center justify-center"
            resizeMode="cover"
          >
            <Image source={item.icon} className="w-8 h-8" />
          </ImageBackground>
          <View className="flex-1">
            <Text className="font-semibold text-base text-gray-800">{item.title}</Text>
            <Text className="text-gray-500 text-sm">{item.description}</Text>
            {idx < specials.length  && (
              <View className="h-px bg-gray-400 mt-3" />
            )}
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default AppSpecialList; 