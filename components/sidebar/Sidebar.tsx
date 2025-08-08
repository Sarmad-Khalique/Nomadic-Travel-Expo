import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSidebarStore } from '../../store/sidebarStore';
import { SidebarProps } from '../../types/sidebar';
import SidebarHeader from './SidebarHeader';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarUserProfile from './SidebarUserProfile';
import Toast from './Toast';

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const { menuItems, userProfile, setActiveMenuItem, toggleMenuItem } = useSidebarStore();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [shouldRender, setShouldRender] = useState(false);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(-320)).current; // Start off-screen
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Slide in animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -320,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Only remove from DOM after animation completes
        setShouldRender(false);
      });
    }
  }, [isVisible, slideAnim, backdropAnim]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'logout') {
      showToast('Logout clicked');
      return;
    }

    const item = menuItems.find(menuItem => menuItem.id === itemId);
    if (item?.subItems) {
      // For expandable items, make them active AND toggle expansion
      setActiveMenuItem(itemId);
      toggleMenuItem(itemId);
      showToast(`${item.title} menu toggled`);
    } else {
      setActiveMenuItem(itemId);
      showToast(`${item?.title} menu clicked`);
    }
  };

  const handleSubItemPress = (subItemId: string) => {
    const parentItem = menuItems.find(item => item.subItems?.some(sub => sub.id === subItemId));
    const subItem = parentItem?.subItems?.find(sub => sub.id === subItemId);
    
    // Only update the active sub-item, don't change parent's active state
    const currentMenuItems = useSidebarStore.getState().menuItems;
    const updatedItems = currentMenuItems.map(item => ({
      ...item,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        isActive: subItem.id === subItemId,
      })),
    }));
    useSidebarStore.setState({ menuItems: updatedItems });
    
    showToast(`${subItem?.title} sub-menu clicked`);
  };

  if (!shouldRender) return null;

  return (
    <View className="absolute inset-0 z-50">
      {/* Animated Backdrop */}
      <Animated.View 
        className="absolute inset-0"
        style={{
          opacity: backdropAnim,
        }}
      >
        <BlurView 
          intensity={100}
          tint="dark"
          className="absolute inset-0"
        />
        <TouchableOpacity 
          className="absolute inset-0" 
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>
      
      {/* Animated Sidebar */}
      <Animated.View 
        className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-blue-200"
        style={{
          transform: [{ translateX: slideAnim }],
        }}
      >
        <SafeAreaView className="flex-1">
          {/* Header */}
          <SidebarHeader onClose={onClose} />
          
          {/* User Profile */}
          <SidebarUserProfile userProfile={userProfile} />
          
          {/* Menu Items */}
          <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
            {menuItems.map((item) => (
              <SidebarMenuItem
                key={item.id}
                item={item}
                onPress={() => handleMenuItemPress(item.id)}
                onSubItemPress={handleSubItemPress}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Animated.View>

      {/* Toast */}
      <Toast 
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default Sidebar;
