import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchData } from "../../api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";


export default function HomeScreen() {
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [posts, setPosts] = useState([]);

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
        <Image 
          source={{ uri: item.cover || 'https://via.placeholder.com/300' }} 
          style={[styles.albumCoverBase, styles.albumCoverBack2]} 
        />
      </View>
  
      {/* Song Title */}
      <View style={styles.songInfoContainer}>
        <Text style={styles.songTitle}>{item.song || "No title found"}</Text>
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
  );
  


  return (
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
      />
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#641346",
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
    paddingTop: 10, // ⬅️ reduce this to move content up
    marginTop: -10, // ⬅️ optional: shift whole post upward
  },
  
  
  albumCovers: {
    height: 300,
    width: "100%",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  albumCoverBase: {
    width: "80%",
    height: 280,
    position: "absolute",
  },
  albumCoverBack2: {
    top: 20,
    left: "10%",
  },
  songInfoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
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

  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Afacad",
  },
  profileSubtitle: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Afacad",
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontFamily: "Afacad",
  },
  artistName: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    fontFamily: "Afacad",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#641346",
    fontFamily: "Afacad",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontFamily: "Afacad",
  },
  
});

