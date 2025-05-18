import { View, Text } from "react-native";

export default function Message() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-xl text-black dark:text-white">Message View</Text>
    </View>
  );
}