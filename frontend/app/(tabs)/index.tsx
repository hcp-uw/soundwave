import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchData } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { CoverStack } from '@/components/albumStack'
import { LinearGradient } from 'expo-linear-gradient';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchData();
      if (data) setPosts(data);
    };
    getPosts();
  }, []);


  const renderPost = ({ item }) => (
    <View style={{ height: SCREEN_HEIGHT }}>
    <View style={styles.musicPost}>
      
      {/* Pink Album + Artist Header */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: item.cover || 'https://via.placeholder.com/150' }} 
              style={styles.profileImage} 
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{item.album || "Unknown Album"}</Text>
            <Text style={styles.profileSubtitle}>{item.artist || "Unknown Artist"}</Text>
          </View>
        </View>
      </View>
  
      {/* Album Cover */}
      <View style={styles.albumCovers}>
        {/* <Image 
          source={{ uri: item.cover || 'https://via.placeholder.com/300' }} 
          style={[styles.albumCoverBase, styles.albumCoverBack2]} 
        /> */}
        <CoverStack uri={item.cover} />
      </View>
  
      {/* Song Title */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>{item.song || "No title found"}</Text>
        <Text style={styles.artistName}>{item.artist || "No title found"}</Text>
      </View>
  
      {/* User Review Section */}
      <View style={styles.commentSection}>
        <View style={styles.commentHeader}>
          <Text style={styles.username}>@username</Text>
          <View style={styles.interactionButtons}>
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons 
                name={isFavorited ? "star" : "star-outline"} 
                size={24} 
                color="#641346" 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#641346" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.commentText}numberOfLines={3} ellipsizeMode="tail">{item.review}{item.content || "No comment"}</Text>
      </View>
  
    </View>
    </View>
  );
  


  return (
    <LinearGradient
      //colors={['#', '#']} // or whatever colors you want!
      //colors={['#F8D0DD', '#641346']}
      colors={['#9E0466', '#000000']}
      style={styles.container}        // make sure container is flex: 1
    >
    <View style={styles.container}>

      {/* Music Posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
      />
    </View>
    </LinearGradient>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#641346",
  },
  
  profileCard: {
    backgroundColor: "#F8D0DD",
    borderRadius: 25,
    // marginTop: 0,
    // marginBottom: 15,

    padding: 15,
    width: 360,  // 👈 Set a fixed width
    height: 120, // 👈 Set a fixed height (same as width to make it square)
    justifyContent: "center", // Optional for centering content
    alignItems: "center", // Optional for centering content
  },
  

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: '#000',           // iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 20,
    justifyContent: "flex-start",
    flexShrink: 1,         // allows text to shrink if needed
    maxWidth: 250,         // adjust based on your layout
  },

  musicPost: {
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 100, // ⬅️ reduce this to move content up
    marginTop: -20, // ⬅️ optional: shift whole post upward
    shadowColor: '#000',           // iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    
  },
  
  albumCovers: {
    height: 380,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -16,
    shadowColor: '#000',           // iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  albumCoverBase: {
    width: "80%",
    height: 80,
    position: "absolute",
  },
  albumCoverBack2: {
    top: 10,
    left: "10%",
  },
  songInfoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: -25,
    marginBottom: 20,
  },
  commentSection: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    width: "100%",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  interactionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    marginLeft: 15,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

