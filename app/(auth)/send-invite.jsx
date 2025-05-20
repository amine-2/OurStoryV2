import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";

export default function SendInvite() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [profile, setProfile] = useState({ name: "", imageUri: null });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profileString = await SecureStore.getItemAsync("userProfile");
      if (profileString) {
        const parsed = JSON.parse(profileString);
        setProfile(parsed);
      } else {
        Alert.alert("Error", "No profile data found.");
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const sendMockInvite = () => {
    setSending(true);

    const invite = {
      id: uuid.v4(),
      name: profile.name,
      imageUri: profile.imageUri,
      timestamp: new Date().toLocaleString(),
    };

    Alert.alert(
      "Invite Sent",
      `Name: ${invite.name}\nID: ${invite.id}\nTime: ${invite.timestamp}`,
      [
        {
          text: "OK",
          onPress: () => router.replace("/(chat)"),
        },
      ]
    );

    setSending(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Send Invite</Text>

      {profile.imageUri && (
        <Image
          source={{ uri: profile.imageUri }}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <Text className="text-lg mb-2">{profile.name}</Text>
      <Text className="text-lg mb-2">{profile.imageUri}</Text>

      <TouchableOpacity
        onPress={sendMockInvite}
        disabled={sending}
        className="bg-indigo-600 px-6 py-3 rounded-lg mt-6"
      >
        <Text className="text-white text-base font-medium">
          {sending ? "Sending..." : "Send Invite"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
