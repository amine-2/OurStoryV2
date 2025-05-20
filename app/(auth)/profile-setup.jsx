import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileSetup() {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    if (!name.trim() || !imageUri) {
      Alert.alert("Missing Info", "Please enter your name and choose a photo.");
      return;
    }

    try {
      await SecureStore.setItemAsync("userProfile", JSON.stringify({ name, imageUri }));
      router.push("/(auth)/send-invite");
    } catch (err) {
      Alert.alert("Error", "Failed to save profile.");
      console.error(err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Set Up Your Profile</Text>

      <TouchableOpacity onPress={pickImage} className="mb-4">
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-32 h-32 rounded-full" />
        ) : (
          <View className="w-32 h-32 rounded-full bg-gray-300 justify-center items-center">
            <Text className="text-gray-600">Choose Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg mb-6"
      />

      <TouchableOpacity
        onPress={saveProfile}
        className="bg-indigo-600 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-base font-medium">Save and Continue</Text>
      </TouchableOpacity>
    </View>
  );
}