// // frontend/components/ui/Icon.tsx
// import React from 'react';
// import { Image, ImageSourcePropType } from 'react-native';  // Import Image from react-native

// // You can import the images directly as modules for React Native to handle them
// import HomeIcon from './icons/Home.png';
// import ProfileIcon from './icons/Profile.png';
// import PlusIcon from './icons/Plus.png';

// // Mapping icon names to image sources
// const icons = {
//   Home: HomeIcon,
//   Profile: ProfileIcon,
//   Plus: PlusIcon,
// };

// interface IconProps {
//   name: 'Home' | 'Profile' | 'Plus';
//   width?: number;   // In React Native, the width and height should be numbers (not strings like '50px')
//   height?: number;
// }

// const Icon: React.FC<IconProps> = ({ name, width = 50, height = 50 }) => {
//   const iconSrc = icons[name];

//   //return <Image source={iconSrc} style={{ width, height }} />;
// };

// export default Icon;
