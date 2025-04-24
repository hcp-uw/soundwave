import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchData } from '@/api';
import { PostData } from './newpost_create';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Review = {
  song: string;
  artist: string;
  content: string;
  cover: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Review[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  useFocusEffect(
    useCallback(() => {
      async function loadPosts() {
        setLoading(true);
        const data = await fetchData();
        if (data) {
          const formatted = data.map((post: PostData) => ({
            song: post.song,
            artist: post.artist,
            content: post.content,
            cover: post.cover,
          }));
          setPosts(formatted);
        }
        setLoading(false);
      }

      loadPosts();
    }, [])
  );

  /*if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }*/

  if (loading) {
      return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              {/* User Profile Header */}
              <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                  <View style={styles.profileImageContainer}>
                    <Image
                      source={{ uri: item.cover || 'https://via.placeholder.com/150' }}
                      style={styles.profileImage}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{item.song || 'No title found'}</Text>
                    <Text style={styles.profileSubtitle}>{item.artist || 'No artist found'}</Text>
                  </View>
                </View>
              </View>

              {/* Music Post */}
              <View style={styles.musicPost}>
                {/* Album Cover */}
                <View style={styles.albumCovers}>
                  <Image
                    source={{ uri: item.cover || 'https://via.placeholder.com/300' }}
                    style={[styles.albumCoverBase, styles.albumCoverBack2]}
                  />
                  <Image
                    source={{ uri: item.cover || 'https://via.placeholder.com/300' }}
                    style={[styles.albumCoverBase, styles.albumCoverBack1]}
                  />
                  <Image
                    source={{ uri: item.cover || 'https://via.placeholder.com/300' }}
                    style={styles.albumCoverFront}
                  />
                </View>

                {/* Song Title */}
                <View style={styles.songInfoContainer}>
                  <Text style={styles.songTitle}>{item.song || 'No title found'}</Text>
                  <Text style={styles.artistName}>{item.artist || 'No artist found'}</Text>
                </View>

                {/* User Comment Section */}
                <View style={styles.commentSection}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.username}>@username</Text>
                    <View style={styles.interactionButtons}>
                      <TouchableOpacity onPress={toggleFavorite}>
                        <Ionicons
                          name={isFavorited ? 'star' : 'star-outline'}
                          size={24}
                          color="#641346"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.playButton}>
                        <Ionicons name="play" size={24} color="#641346" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.commentText}>{item.content || 'No comment'}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#641346",
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: "#F8D0DD",
    borderRadius: 25,
    margin: 20,
    padding: 15,
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
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  profileSubtitle: {
    fontSize: 16,
    color: "#000",
  },
  musicPost: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  albumCoverBack1: {
    top: 10,
    left: "5%",
  },
  albumCoverFront: {
    width: "90%",
    height: 280,
    borderRadius: 5,
  },
  songInfoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artistName: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
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
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#641346",
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