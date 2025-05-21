import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import RedPulseGradient from "../../components/RedPulseGradient";
import { createUser } from "../../scripts/createUser";
import { uploadProfileImage } from "../../scripts/uploadProfileImage";
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
    const userId = uuid.v4();

try {
  const imageUrl = await uploadProfileImage(imageUri, userId);
  await createUser({ id: userId, name, image_url: imageUrl });
  await SecureStore.setItemAsync("myProfile", JSON.stringify({ id: userId, name, imageUri }));
  router.push("/(chat)");
} catch (err) {
  console.error("Failed to create user or upload image", err);
}
  };

  return (
    <RedPulseGradient>
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-3xl obold mb-6 text-white">Set Up Your Profile</Text>

      <TouchableOpacity onPress={pickImage} className="m-10">
        {imageUri ? (
          <View className="w-48 h-48 rounded-full justify-center border-2 border-white items-center">
          <Image source={{ uri: imageUri }} className="w-44 h-44 rounded-full " />
          </View>
        ) : (
          <View className="flex w-48 h-48 rounded-full justify-center border border-white items-center">
            <View className=" flex w-44 h-44 opacity-50 rounded-full justify-center items-center bg-black">
            <Text className="text-white text-center othin text-lg ">Choose Photo</Text>
           </View>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Your name"
        value={name}
        placeholderTextColor="#E5E7EB" 
        onChangeText={setName}
        className="w-[80vw] border border-white rounded-lg rthin text-white px-4 py-2 text-2xl mb-6"
      />

      <TouchableOpacity
        onPress={saveProfile}
        className="bg-white px-6 py-3 rounded-lg mt-10 border border-white"
      >
        <Text className="text-2xl rthin text-clip ">Save and Continue</Text>
      </TouchableOpacity>
    </View>
    </RedPulseGradient>
  );
}