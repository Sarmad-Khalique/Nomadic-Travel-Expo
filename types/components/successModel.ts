import { ImageSourcePropType } from 'react-native';

export interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  icon?: ImageSourcePropType; // ✅ Correct type for image source
}
