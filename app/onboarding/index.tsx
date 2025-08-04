import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    View,
} from "react-native";
import Animated from "react-native-reanimated";

import AppButton from "../../components/Button";
import { COLORS } from "../../constants/colors";
import { Slide } from "../../types/onboarding";

const { width } = Dimensions.get("window");

const slides: Slide[] = [
  {
    id: "1",
    image: require("../../assets/images/onboarding/onboarding1.jpg"),
    title: ["Life is brief, but the universe is", " vast."],
    description:
      "At Tourista Adventures, we curate unique and immersive travel experiences to destinations around the globe.",
    buttonText: "Get Started",
  },
  {
    id: "2",
    image: require("../../assets/images/onboarding/onboarding2.jpg"),
    title: ["The world is waiting for you, go ", "discover it."],
    description:
      "Embark on an unforgettable journey by venturing outside of your comfort zone. Hidden gems await.",
    buttonText: "Next",
  },
  {
    id: "3",
    image: require("../../assets/images/onboarding/onboarding3.jpg"),
    title: ["People don’t take trips, trips take ", "people."],
    description:
      "To get the best of your adventure you just need to leave and go where you like. We are waiting for you.",
    buttonText: "Get Started",
  },
];

export default function OnboardingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      router.replace("/(auth)/login"); 
    } else {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    }
  };

  return (
    <FlatList
      data={slides}
      ref={flatListRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ImageBackground
          source={item.image}
          style={{ width, flex: 1 }}
          resizeMode="cover"
        >
          <StatusBar style="light" />
          <View className="flex-1 justify-end items-center px-6 pb-16 bg-black/30">
            <View className="w-[309px] items-center">
              <Text className="text-[30px] leading-[36px] text-white text-center font-merriweather-bold">
                {item.title[0]}
              </Text>

              <View style={{ position: "relative" }}>
                <ImageBackground
                  source={require("../../assets/images/onboarding/Vector.png")}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    bottom: -9,
                    left: -118,
                    height: 12,
                    width: "100%",
                  }}
                />
                <Text className="text-[30px] leading-[36px] text-primary text-center font-merriweather-bold">
                  {item.title[1]}
                </Text>
              </View>
            </View>

            <Text className="text-base text-white text-center mt-4 w-[309px]">
              {item.description}
            </Text>

            {/* Pagination Dots */}
            <View className="flex-row justify-center my-10">
              {slides.map((_, i) => (
                <Animated.View
                  key={i}
                  style={{
                    width: i === activeIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    backgroundColor:
                      i === activeIndex ? COLORS.primary : COLORS.background,
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            <AppButton title={item.buttonText} onPress={handleNext} />
          </View>
        </ImageBackground>
      )}
    />
  );
}
