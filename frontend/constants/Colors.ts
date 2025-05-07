/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { opacity } from "react-native-reanimated/lib/typescript/Colors";

const tintColorLight = '#FFFFFF';
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#FFFFFF',
    tabIconDefault: '#FFFFFF',
    tabIconSelected: tintColorLight,
    navBackground: '#740D4B',
    navIcon: '#FFFFFF',
    navIconSelected: '#F5C1CC',
    opacity: 0.9,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#FFFFFF',
    tabIconDefault: '#FFFFFF',
    tabIconSelected: tintColorDark,
    navBackground: '#740D4B',
    navIcon: '#FFFFFF',
    navIconSelected: '#F5C1CC',
  },
  background: { 
    text: '#FFFFFF',
    background: '#740D4B',
    icon: '#FFFFFF',
    tabIconDefault: '#FFFFFF',
    tabIconSelected: '#F5C1CC',
  },
};
