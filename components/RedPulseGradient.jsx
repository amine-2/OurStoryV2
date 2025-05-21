import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function RedPulseGradient({ children, style }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 4000 }),
      -1,
      true // reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const midColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#1a1a1a", "#8f00ff"] // subtle red pulse
    );

    return {
      colors: ['#1a1a1a',midColor, '#8f00ff'],
    };
  });

  return (
    <AnimatedLinearGradient
      style={{ flex: 1, width, height }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      animatedProps={animatedStyle}
      
    >
      {children}
    </AnimatedLinearGradient>
  );
}
