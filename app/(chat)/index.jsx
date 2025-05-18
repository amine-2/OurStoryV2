import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Chat() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl text-black dark:text-white">Your Chat</Text>
      <Button title="Open Message" onPress={() => router.push("/(chat)/message")} />
    </View>
  );
}