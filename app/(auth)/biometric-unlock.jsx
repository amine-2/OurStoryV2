import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RedPulseGradient from "../../components/RedPulseGradient";




export default function BiometricUnlock() {


  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [supported, setSupported] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    checkBiometricStatus();
  }, []);

  const checkBiometricStatus = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setSupported(compatible && enrolled);
    setChecked(true);
  };

  const authenticate = async () => {
    setIsAuthenticating(true);
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock with Biometrics",
      fallbackLabel: "Enter Passcode",
      cancelLabel: "Cancel",
    });
    setIsAuthenticating(false);

    if (result.success) {
      // Navigate to Profile Setup on success
      router.push("/(auth)/profile-setup");
    } else {
      Alert.alert("Authentication failed", "Please try again.");
    }
  };

  const openBiometricSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("App-Prefs:"); // Opens iOS settings
    } else {
      Linking.openSettings(); // Opens Android settings
    }
  };

  return (
    <RedPulseGradient>
      <View className=" flex flex-1 justify-center items-center h-full p-4">
        <Text className="text-5xl obold h-[30%] text-white  text-center  ">
          Welcome Back Baby
        </Text>

        <View className=" justify-center items-center h-[30%] mt-10   ">
          <Text className="text-xl obold text-white mb-6 ">
            {supported ? "Press to Unlock" : "Set Biometrics"}
          </Text>

          <Animated.View style={{ transform: [{ translateY: bounceAnim }] }}>
            <Image
              source={require("../../assets/icons/down-arrow.png")}
              className="w-6 h-6"
            />
          </Animated.View>

          {!checked ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : isAuthenticating ? (
            <>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text className="mt-4 text-white">Authenticating...</Text>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={supported ? authenticate : openBiometricSettings}
                className="  w-24 h-28 mt-10  rounded-full "
              >
                <Image
                  source={require("../../assets/icons/unlock.png")}
                  className="w-full h-full"
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <StatusBar style="translucent" />
    </RedPulseGradient>
  );
}
