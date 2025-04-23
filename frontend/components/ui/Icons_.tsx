// frontend/components/ui/Icon.tsx
import React from 'react';

// Create a mapping of icon names to image paths
const icons = {
  Home: require('./icons/Home.png'),
  Profile: require('./icons/Profile.png'),
  Plus: require('./icons/Plus.png'),
};

interface IconProps {
  name: 'Home' | 'Profile' | 'Plus'; // Limit the accepted icon names
  width?: string;
  height?: string;
}

const Icon: React.FC<IconProps> = ({ name, width = '50px', height = '50px' }) => {
  // Get the image path from the `icons` object based on the `name` prop
  const iconSrc = icons[name];

  return <img src={iconSrc} alt={name} style={{ width, height }} />;
};

export default Icon;