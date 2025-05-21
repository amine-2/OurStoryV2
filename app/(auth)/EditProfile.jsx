import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import RedPulseGradient from "../../components/RedPulseGradient";

export default function ProfileEdit() {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [id, setId] = useState(null); // Keep UUID if it exists
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileString = await SecureStore.getItemAsync("myProfile");
        if (profileString) {
          const profile = JSON.parse(profileString);
          setName(profile.name || "");
          setImageUri(profile.imageUri || null);
          setId(profile.id || null); // Preserve UUID
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    loadProfile();
  }, []);

  const deleteProfile = async () => {
    await SecureStore.deleteItemAsync("myProfile");
    Alert.alert("Profile deleted");
    router.replace("/(auth)/biometric-unlock");
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Keep as is
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
      await SecureStore.setItemAsync(
        "myProfile",
        JSON.stringify({ id, name, imageUri }) // Save with preserved UUID
      );
      router.push("/(auth)/send-invite");
    } catch (err) {
      Alert.alert("Error", "Failed to save profile.");
      console.error(err);
    }
  };

  return (
    <RedPulseGradient>
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-3xl obold mb-6 text-white">Edit Your Profile</Text>

        <TouchableOpacity onPress={pickImage} className="m-10">
          {imageUri ? (
            <View className="w-48 h-48 rounded-full justify-center border-2 border-white items-center">
              <Image source={{ uri: imageUri }} className="w-44 h-44 rounded-full " />
            </View>
          ) : (
            <View className="flex w-48 h-48 rounded-full justify-center border border-white items-center">
              <View className="flex w-44 h-44 opacity-50 rounded-full justify-center items-center bg-black">
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

        <TouchableOpacity
          onPress={deleteProfile}
          className="mt-6 bg-red-700 px-4 py-2 rounded-sm"
        >
          <Text className="text-white font-bold p-4 rounded-md">Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </RedPulseGradient>
  );
}