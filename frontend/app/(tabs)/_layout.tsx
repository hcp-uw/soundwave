import { Tabs } from 'expo-router';
//import React from 'react';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import TabBarBackground from '@/components/ui/TabBarBackground'; // make sure the path matches
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
//import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// import { Home, icon, Plus } from '@/assets/icons_custom';
// import Icon from "@/components/ui/Icons_";
// import HomeIcon from "@/components/ui/Icons_";
// import ProfileIcon from '"@/components/ui/Icons_/Profile.png";
// import PlusIcon from '"@/components/ui/Icons_/Plus.png";



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
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].navIconSelected,
        tabBarInactiveTintColor: Colors.background.tabIconDefault,
        
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        position: 'absolute',
        
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0, // for Android
            shadowOpacity: 0, // for iOS
            backgroundColor: 'transparent',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ color }: { color: string }) => (
          //   //<IconSymbol size={28} name="house.fill" color={color} />
          //   //<Icon name="Home" width="50px" height="50px" />
          // ),
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="newlist"
        options={{
          title: 'New List',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          
        }}
      />
      
     <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="person.crop.circle" color={color} />
          ), 
        }}
      />
      <Tabs.Screen
        name="search_results"
        options={{
          title: 'New Post',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
          
        }}
        />
        <Tabs.Screen
          name="newpost_create"
          options={{
            href: null, // hides it from the tab bar
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            href: null, // hides it from the tab bar
          }}
        />
    </Tabs>
  );
}
