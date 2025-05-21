import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Dummy data for invites and chats
const invites = [
  { id: '1', name: 'Alice', imageUri: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob', imageUri: 'https://i.pravatar.cc/150?img=2' },
];

const chats = [
  {
    id: '1',
    name: 'Charlie',
    imageUri: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Hey there!',
    status: 'Seen',
  },
  {
    id: '2',
    name: 'Diana',
    imageUri: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'Let’s talk tomorrow',
    status: 'Delivered',
  },
];

//*******************************************/ */




export default function ChatScreen() {
  const [profile, setProfile] = useState({ name: "", imageUri: null });
  const router = useRouter();

  const loadProfile = async () => {
  
  
  
  try {
    const profileString = await SecureStore.getItemAsync("myProfile");
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

useEffect(() => {
  loadProfile();
}, []);

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      {/* Navbar */}
      <View className="flex-row justify-between items-center mb-6">
        <Image
          source={{ uri: profile.imageUri }}
          className="w-10 h-10 rounded-full"
        />
        
        <TouchableOpacity
          onPress={() => router.push('/(auth)/EditProfile')}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          <Text className="text-gray-700 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Invites Section */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-2">Invites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {invites.map((invite) => (
            <View key={invite.id} className="mr-4 items-center">
              <Image
                source={{ uri: invite.imageUri }}
                className="w-16 h-16 rounded-full mb-1"
              />
              <Text className="text-sm">{invite.name}</Text>
              <TouchableOpacity className="bg-blue-500 px-3 py-1 rounded mt-1">
                <Text className="text-white text-xs">Accept</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Chat List */}
      <Text className="text-lg font-bold mb-2">Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-row items-center mb-4">
            <Image
              source={{ uri: item.imageUri }}
              className="w-14 h-14 rounded-full mr-4"
            />
            <View className="flex-1">
              <Text className="font-semibold text-base">{item.name}</Text>
              <Text className="text-gray-500 text-sm">{item.lastMessage}</Text>
            </View>
            <Text className="text-xs text-gray-400">{item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}



