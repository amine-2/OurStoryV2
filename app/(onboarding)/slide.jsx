import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useRef, useState } from "react";
import RedPulseGradient from "../../components/RedPulseGradient";


import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

SystemUI.setBackgroundColorAsync("transparent");

const slides = [
  {
    key: "slide1",
    title: "Hey Habibi",
    description: "Welcome to our own chat app. Enjoy your private space.",
    image: require("../../assets/images/love-gesture.png"),
  },
  {
    key: "slide2",
    title: "A Little New Chapter In Our Story",
    description: "A secret world where every word and glance means more.",
    image: require("../../assets/images/bird-love.png"),
  },
  {
    key: "slide3",
    title: "Your Private Space",
    description: "Biometric lock and no cloud — just us.",
    image: require("../../assets/images/ballons.png"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/biometric-unlock");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <RedPulseGradient>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={{ flexGrow: 1 }}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={viewableItemsChanged}
        renderItem={({ item }) => (
          <View className="flex-1 justify-center items-center">

           <Image source={item.image} className="w-[50vw] h-[50vw] m-10" />


          <View
            style={{ width }}
            className=" flex items-center justify-center px-6 "
          >
            <Text className="text-4xl obold  w-[90vw]  text-center text-white mb-4">
              {item.title}
            </Text>
            <Text className="text-2xl w-[85vw] text-white olight text-center">
              {item.description}
            </Text>
          </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mt-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between px-10 mt-10 mb-8">
        <TouchableOpacity onPress={handlePrev} disabled={currentIndex === 0}>
          <Text
            className={`text-base ${
              currentIndex === 0 ? "text-white/40" : "text-white"
            }`}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text className="text-base text-white">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
    </RedPulseGradient>
  );
}
