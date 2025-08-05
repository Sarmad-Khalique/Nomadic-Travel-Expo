import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';
import { cn } from '../utils/cn';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
  iconLeft?: ImageSourcePropType;
  isLoading?: boolean;
  loaderColor?: string;
}

export default function AppButton({
  title,
  variant = 'primary',
  size = 'lg',
  className,
  textClassName,
  iconLeft,
  isLoading = false,
  loaderColor,
  disabled,
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

  // Determine loader color based on variant if not specified
  const calculatedLoaderColor = loaderColor || 
    (variant === 'outline' ? 'black' : 'white');

  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg justify-center items-center flex-row',
        sizeStyles[size],
        variantStyles[variant],
        (disabled || isLoading) && 'opacity-70',
        className
      )}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={calculatedLoaderColor} 
          size="small" 
          className="mr-2"
        />
      ) : iconLeft ? (
        <Image
          source={iconLeft}
          className="w-5 h-5 mr-2"
          resizeMode="contain"
        />
      ) : null}
      
      <Text className={cn(
        'text-base font-semibold',
        textColors[variant],
        isLoading && 'ml-2',
        textClassName
      )}>
        {isLoading ? 'Processing...' : title}
      </Text>
    </TouchableOpacity>
  );
}