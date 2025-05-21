import { Stack } from "expo-router";

export default function AuthLayout() {
  return(
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="biometric-unlock" />
    <Stack.Screen name="profile-setup" />
    <Stack.Screen name="EditProfile" />
    
  </Stack>
  ) 
}
