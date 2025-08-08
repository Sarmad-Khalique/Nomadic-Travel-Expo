import React, { useEffect, useRef } from 'react';
import { Animated, Text } from 'react-native';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onHide());
    }
  }, [visible, fadeAnim, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 8,
        zIndex: 1000,
      }}
    >
      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;
