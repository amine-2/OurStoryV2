import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Unlock() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl text-black dark:text-white">Biometric Unlock</Text>
      <Button title="Next" onPress={() => router.push("/(auth)/profile-setup")} />
    </View>
  );
}