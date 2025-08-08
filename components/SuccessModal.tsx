import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SuccessModalProps } from '../types/components/successModel';

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title,
  message,
  icon,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView
          intensity={50}
          tint="dark"
          className="flex-1 justify-center items-center px-6"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="w-full items-center"
          >
            <TouchableWithoutFeedback>
              <View className="bg-white p-6 rounded-xl items-center w-full">
                {icon && (
                  <Image
                    source={icon}
                    className="w-24 h-24 mb-6" // Increased size from w-14 h-14
                    resizeMode="contain"
                  />
                )}
                {title && (
                  <Text className="font-merriweather-bold text-2xl text-black mb-2">
                    {title}
                  </Text>
                )}
                {message && (
                  <Text className="text-center text-text font-poppins-regular text-lg">
                    {message}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SuccessModal;