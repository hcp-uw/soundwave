import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchData } from '@/api';
import { CoverStack } from '@/components/albumStack';
import { PostData } from './newpost_create';

//adding navigation
import { useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from "@react-navigation/stack";
import { NavigationProp } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

type RootStackParamList = {
  postfocus: {
    songTitle: string;
    songArtist: string;
    cover: string;
    content: string;
  };
  // add more screens here if needed
};

type ProfileNavProp = StackNavigationProp<RootStackParamList, "postfocus">;


type Review = {
  song: string;
  artist: string;
  content: string;
  cover: string;
  album: string;
  uid: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  const [posts, setPosts] = useState<Review[]>([]);
  const [favoritedPosts, setFavoritedPosts] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const toggleFavorite = (index: number) => {
    setFavoritedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
            album: post.album,
            uid: post.uid,
          }));
          setPosts(formatted);
        }
        setLoading(false);
      }
      loadPosts();
    }, [])
  );

  const renderPost = ({ item, index }: { item: Review; index: number }) => (
    <View style={{ height: SCREEN_HEIGHT }}>
      <View style={styles.musicPost}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: item.cover || 'https://via.placeholder.com/150' }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={2} ellipsizeMode="tail">{item.album || 'Unknown Album'}</Text>
              <Text style={styles.profileSubtitle} numberOfLines={1} ellipsizeMode="tail">{item.artist || 'Unknown Artist'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.albumCovers}>
          <CoverStack uri={item.cover} />
        </View>

        <View style={styles.songInfoContainer}>
          <Text style={styles.songTitle} numberOfLines={2} ellipsizeMode="tail">{item.song || 'No title found'}</Text>
          <Text style={styles.artistName}>{item.artist || 'No artist found'}</Text>
        </View>

        <View style={styles.commentSection}>
          <View style={styles.commentHeader}>
            <Text style={styles.username}>@{item.uid?.split('@')[0] || 'unknown'}</Text>
            <View style={styles.interactionButtons}>
              <TouchableOpacity onPress={() => toggleFavorite(index)}>
                <Ionicons
                  name={favoritedPosts[index] ? 'star' : 'star-outline'}
                  size={24}
                  color="#641346"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.playButton} onPress={ () => navigation.navigate("postfocus", {
                    songTitle: item.song,
                    songArtist: item.artist,
                    cover: item.cover,
                    content: item.content, // pass the review text too
                  })
                  }>
                <Ionicons name="play" size={24} color="#641346" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.commentText} numberOfLines={4} ellipsizeMode="tail">
            {item.content || 'No comment'}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <LinearGradient colors={['#9E0466', '#000000']} style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={SCREEN_HEIGHT}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#F8D0DD',
    borderRadius: 25,
    padding: 15,
    width: 360,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 20,
    justifyContent: 'flex-start',
    fontFamily: "Afacad",
    flexShrink: 1,
    maxWidth: 250,
  },
  //album title in top container
  profileName: {
    fontSize: 24,
    //marginTop: -5,
    lineHeight: 28,
    fontFamily: "Afacad",
    fontWeight: 'bold',
    color: '#000',
  },
  //artist name in top container
  profileSubtitle: {
    fontSize: 18,
    fontFamily: "Afacad",
    color: '#000',
  },
  musicPost: {
    height: SCREEN_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
    marginTop: -10,
  },
  albumCovers: {
    height: 350,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  songInfoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -25,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 25,
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
    fontFamily: "Afacad",
    textAlign: 'center',
  },
  artistName: {
    fontSize: 20,
    lineHeight: 20,
    color: 'white',
    fontFamily: "Afacad",
    textAlign: 'center',
  },
  commentSection: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '100%',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Afacad",
    color: '#641346',
  },
  interactionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    marginLeft: 15,
  },
  commentText: {
    fontSize: 19,
    color: '#333',
    fontFamily: "Afacad",
    lineHeight: 20,
  },
});
