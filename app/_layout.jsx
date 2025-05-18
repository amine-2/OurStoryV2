 
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import "../global.css";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oxygen-Bold': require('../assets/fonts/Oxygen-Bold.ttf'),
    'Oxygen-Light': require('../assets/fonts/Oxygen-Light.ttf'),
    'Oxygen-Regular': require('../assets/fonts/Oxygen-Regular.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto-Thin.ttf'),
    'Overpass-ExtraBold': require('../assets/fonts/Overpass-ExtraBold.ttf'),
    'Overpass-Bold': require('../assets/fonts/Overpass-Bold.ttf'),
    'Overpass-Regular': require('../assets/fonts/Overpass-Regular.ttf'),
    'Overpass-Light': require('../assets/fonts/Overpass-Light.ttf'),
    'Overpass-Medium': require('../assets/fonts/Overpass-Medium.ttf'),
    'Overpass-Thin': require('../assets/fonts/Overpass-Thin.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null; // or a loading spinner
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"   />
      <Stack.Screen name="(onboarding)"  />
      <Stack.Screen name="(auth)"  />
      <Stack.Screen name="(chat)"  />
    </Stack>
  
  );
}
