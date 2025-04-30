import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchData } from '@/api';
import { PostData } from './newpost_create';

type Review = {
  song: string;
  artist: string;
  content: string;
  cover: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadPosts() {
        setLoading(true);
        const data = await fetchData();
        console.log('Fetched posts:', data); // 🔍 add this line
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: item.cover || "https://via.placeholder.com/100" }}
                style={styles.albumArt}
              />
              <View>
                <Text style={styles.albumTitle}>{item.song || "No title found"}</Text>
                <Text style={styles.artistName}>{item.artist || "No artist found"}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{item.content}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#641346',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a36892',
    borderRadius: 16,
    padding: 12,
  },
  albumArt: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Afacad',
    color: 'white',
  },
  artistName: {
    fontSize: 16,
    fontFamily: 'Afacad',
    color: 'white',
  },
  reviewText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Afacad',
    color: 'white',
    backgroundColor: '#3d084e',
    padding: 10,
    borderRadius: 10,
  },
});
