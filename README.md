# soundwave

soundwave is a community-first platform app built for people who have something say about what they listen to. While traditional music apps focus on streaming, soundwave creates a space where discovery, opinions, and connection come together. Users can review songs, curate playlists, and dive into meaningful discussions about the music they love.
By blending the simplicity of reviews with the depth of a social network, soundwave offers a more personal, interactive way to explore music.

## 📖 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Author/Credits](#author/credits)

## 🔧 Installation

To set up **soundwave** locally, follow these steps:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/soundwave.git

# 2. Navigate into the project directory
cd soundwave

# 3. Install dependencies
npm install

# 4. Install required pods (iOS only)
cd ios && pod install && cd ..

# 5. Make sure the following are installed: 

Node.js (v18+ recommended)

npm or yarn

Expo CLI: npm install -g expo-cli

Xcode (for iOS) or Android Studio (for Android)
```

## Usage
Start the frontend server
```bash
cd frontend

npx expo start
```

Open a separate terminal, and start the backend server
```bash
cd starter-backed

npm run start
```

Then scan the QR code with the Expo Go app (for physical devices), or

Press i to open in iOS Simulator

Press a to open in Android Emulator

## ✨ Features

- 🔐 **Google Authentication** – Log in securely using your Google account  
- 📝 **Create Song Reviews** – Share your thoughts on any song, with data fetching directly through the Spotify API 
- 🔍 **Discover New Music** – Explore trending songs and user reviews on an interactive, community-driven homepage  
- 👤 **Personalized Profile** – View and manage all your reviews in one place


## Contributing

## Authors/Credits
Created by: 
Miranda Nayak, Ahana Roy, & Aditi Rana (frontend) & Rachel Hines, Viba Raghunathan, & Kanishka Singh (backend)

Thank you to the Husky Coding Project Team for their support and guidance on our app!
