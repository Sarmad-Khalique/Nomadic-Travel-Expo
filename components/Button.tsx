import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { cn } from '../utils/cn'; // utility to merge class strings

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
  iconLeft?: ImageSourcePropType; // 
}

export default function AppButton({
  title,
  variant = 'primary',
  size = 'lg',
  className,
  textClassName,
  iconLeft,
  ...props
}: AppButtonProps) {
  const sizeStyles = {
    sm: 'h-10 px-4',
    md: 'h-11 px-6',
    lg: 'h-12 w-[344px]', 
  };

  const variantStyles = {
    primary: 'bg-primary',
    secondary: 'bg-complementary',
    outline: 'bg-transparent border border-black',
  };

  const textColors = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-black',
  };

  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg justify-center items-center flex-row',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      activeOpacity={0.8}
      {...props}
    >
      {iconLeft && (
        <Image
          source={iconLeft}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
      )}
      <Text className={cn('text-base font-semibold', textColors[variant], textClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
