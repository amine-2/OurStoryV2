import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Setup() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl text-black dark:text-white">Setup Your Profile</Text>
      <Button title="Go to Chat" onPress={() => router.push("/(chat)")} />
    </View>
  );
}