import React from 'react';
import { Image, StyleProp, ImageStyle, ImageSourcePropType, Text } from 'react-native';
import { OpaqueColorValue } from 'react-native';

import homeIcon from './icons/Home.png';
import plus from './icons/Plus.png';
import profile from './icons/Profile.png';

const IMAGE_MAPPING = {
  'homeIcon.fill': homeIcon,
  'plus.fill': plus,
  'profile.fill': profile,
} as const;

export type IconSymbolName = keyof typeof IMAGE_MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ImageStyle>;
}) {
  const imageSource = IMAGE_MAPPING[name] as ImageSourcePropType | undefined;

  if (!imageSource) {
    console.log("hi hi hi hi h ih ih");
    console.warn(`⚠️ IconSymbol: No image found for name "${name}"`);
    return (
      <Text style={{ color: 'red', fontSize: 12 }}>
        Missing: {name}
      </Text>
    );
  }

  return (
    <Image
      source={imageSource}
      resizeMode="contain"
      style={[
        {
          width: size,
          height: size,
          tintColor: typeof color === 'string' ? color : undefined,
          //backgroundColor: 'pink', // temp, to help visualize
          backgroundColor: 'red', // 🔥 TEMPORARY to see it
          borderWidth: 1, // 🔥 TEMPORARY to see it
          borderColor: 'blue', // 🔥 TEMPORARY to see it
        },
        style,
      ]}
    />
  );
}

// import React from 'react';
// import { Image, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';
// import { OpaqueColorValue } from 'react-native';

// import homeIcon from './icons/Home.png';
// import plus from './icons/Plus.png';
// import profile from './icons/Profile.png';

// const IMAGE_MAPPING = {
//   'homeIcon.fill': homeIcon,
//   'plus.fill': plus,
//   'profile.fill': profile,
// } as const;

// export type IconSymbolName = keyof typeof IMAGE_MAPPING;

// export function IconSymbol({
//   name,
//   size = 24,
//   color,
//   style,
// }: {
//   name: IconSymbolName;
//   size?: number;
//   color?: string | OpaqueColorValue;
//   style?: StyleProp<ImageStyle>;
// }) {
//   const imageSource = IMAGE_MAPPING[name] as ImageSourcePropType;

//   if (!imageSource) return null;

//   return (
//     <Image
//       source={imageSource}
//       resizeMode="contain"
//       style={[
//         {
//           width: size,
//           height: size,
//           tintColor: typeof color === 'string' ? color : undefined,
//         },
//         style,
//       ]}
//     />
//   );
// }


// // // This file is a fallback for using MaterialIcons on Android and web.

// // import homeIcon from './icons/Home.png';
// // import plus from './icons/Plus.png';
// // import profile from './icons/Profile.png';
// // import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// // import { Image, StyleProp, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
// // import { SymbolWeight } from 'expo-symbols';
// // import React from 'react';
// // import { OpaqueColorValue } from 'react-native';

// // // MaterialIcons mapping
// // // const MAPPING = {
// // //   'house.fill': 'home',
// // //   'paperplane.fill': 'send',
// // //   'chevron.left.forwardslash.chevron.right': 'code',
// // //   'chevron.right': 'chevron-right',
// // // } as const;

// // // PNG images mapping
// // const IMAGE_MAPPING = {
// //   'homeIcon.fill': homeIcon,
// //   'plus.fill': plus,
// //   'profile.fill': profile,
// // };

// // export type IconSymbolName = keyof (typeof IMAGE_MAPPING);

// // export function IconSymbol({
// //   name,
// //   size = 24,
// //   color,
// //   style,
// // }: {
// //   name: IconSymbolName;
// //   size?: number;
// //   color: string | OpaqueColorValue;
// //   style?: StyleProp<ViewStyle> | StyleProp<ImageStyle>;
// //   weight?: SymbolWeight;
// // }) {
 
// //   const imageSource = IMAGE_MAPPING[name] as ImageSourcePropType;

// //   if (imageSource) {
// //     return (
// //       <Image
// //         source={imageSource}
// //         resizeMode="contain"
// //         style={[
// //           {
// //             width: size,
// //             height: size,
// //             tintColor: typeof color === 'string' ? color : undefined, // 🔥 this applies color!
// //           },
// //           style as StyleProp<ImageStyle>,
// //         ]}
// //       />
// //     );
// //   }

// //   return null; // fallback if no icon found
// // }



// // // // This file is a fallback for using MaterialIcons on Android and web.
// // // import homeIcon from './icons/Home.png';
// // // import plus from './icons/Plus.png';
// // // import profile from './icons/Profile.png';
// // // import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// // // import { SymbolWeight } from 'expo-symbols';
// // // import React from 'react';
// // // import { OpaqueColorValue, StyleProp, ViewStyle, Image, ImageStyle } from 'react-native';

// // // // Add your SFSymbol to MaterialIcons mappings here.
// // // const MAPPING = {
// // //   // See MaterialIcons here: https://icons.expo.fyi
// // //   // See SF Symbols in the SF Symbols app on Mac.
// // //   'house.fill': 'home',
// // //   'paperplane.fill': 'send',
// // //   'chevron.left.forwardslash.chevron.right': 'code',
// // //   'chevron.right': 'chevron-right',
// // //   'homeIcon.fill' : 'homeIcon',
// // //   'plus.fill' : 'plus',
// // //   'profile.fill' : 'profile',
// // // } as Partial<
// // //   Record<
// // //     import('expo-symbols').SymbolViewProps['name'],
// // //     React.ComponentProps<typeof MaterialIcons>['name']
// // //   >
// // // >;

// // // const IMAGE_MAPPING = {
// // //   'homeIcon.fill': homeIcon,
// // //   'plus.fill': plus,
// // //   'profile.fill': profile,
// // // } as const;

// // // //export type IconSymbolName = keyof typeof MAPPING;
// // // export type IconSymbolName = keyof (typeof MAPPING & typeof IMAGE_MAPPING);



// // // /**
// // //  * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
// // //  *
// // //  * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
// // //  */
// // // export function IconSymbol({
// // //   name,
// // //   size = 24,
// // //   color,
// // //   style,
// // // }: {
// // //   name: IconSymbolName;
// // //   size?: number;
// // //   color: string | OpaqueColorValue;
// // //   style?: StyleProp<ViewStyle>;
// // //   weight?: SymbolWeight;
// // // }) {
// // //   return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
// // // }
