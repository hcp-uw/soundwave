import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({ 'CustomFont': require('@/assets/fonts/Afacad-VariableFont_wght.ttf') });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: Colors[colorScheme!].navIconSelected,
        tabBarInactiveTintColor: Colors.background.tabIconDefault,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: 'transparent',
          },
          default: {},
        }),
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={30} name="homeIcon.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="postfocus"
        options={{href:null,}} 
        />
        <Tabs.Screen
        name="home"
        options={{href:null,}} 
        />

      {/* Search / New Post */}
      <Tabs.Screen
        name="search_results"
        options={{
          title: 'New Post',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={40} name="plus.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol size={35} name="profile.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}