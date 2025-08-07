// components/CategorySelector.tsx
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const categories = [
  { label: 'Popular', icon: '🔥' },
  { label: 'Beach', icon: '🏖️' },
  { label: 'Lake', icon: '🏞️' },
  { label: 'Mountain', icon: '⛰️' },
  { label: 'City', icon: '🏙️' },
  { label: 'Forest', icon: '🌲' },
  { label: 'Desert', icon: '🏜️' },
  { label: 'Island', icon: '🏝️' },
  { label: 'Cultural', icon: '🏛️' },
  { label: 'Adventure', icon: '🧗' },
];

const CategorySelector = () => {
  const [selected, setSelected] = useState('Popular');
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
      contentContainerStyle={{ paddingHorizontal: 6 }}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
            selected === category.label ? 'bg-red-500' : 'bg-gray-100'
          }`}
          onPress={() => setSelected(category.label)}
        >
          <Text className="mr-2">{category.icon}</Text>
          <Text 
            className={`font-semibold ${
              selected === category.label ? 'text-white' : 'text-gray-700'
            }`}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategorySelector;
