import { ImageSourcePropType } from 'react-native';

export interface Slide {
  id: string;
  image: ImageSourcePropType;
  title: [string, string];
  description: string;
  buttonText: string;
}
export type Slides = Slide[];