import { Tabs } from 'expo-router';
//import React from 'react';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Load fonts
  const [fontsLoaded] = useFonts({
    'CustomFont': require('@/assets/fonts/Afacad-VariableFont_wght.ttf'),
    //'CustomFont-Bold': require('@/assets/fonts/CustomFont-Bold.ttf'),
  });

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Prevent rendering until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }
  // Tab bars
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="newpost"
        options={{
          title: 'newpost',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          title: 'home',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="newlist"
        options={{
          title: 'newlist',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="plus" color={color} />
          ),
          
        }}
      /> */}
    </Tabs>
  );
}
