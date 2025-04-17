import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchData } from '@/api';
import { PostData } from './newpost_create'; 

// parameters for review card
type Review = {
  title: string;
  artist: string;
  review: string;
  image: string;
};

// hardcoded list of albums until lists are created
const albumLists = [
  {
    title: 'all time favs',
    albums: [
      'https://m.media-amazon.com/images/I/7142A60vpNS._UF1000,1000_QL80_.jpg',
      'https://static.wikia.nocookie.net/keshi/images/4/45/Gabriel_album_cover.jpg/revision/latest?cb=20220323064224',
      'https://cdn-images.dzcdn.net/images/cover/a87d8380756567e6bc1f65d43ac2b46d/0x1900-000000-80-0-0.jpg',
      'https://upload.wikimedia.org/wikipedia/en/a/a3/I_Said_I_Love_You_First.jpg',
      'https://i.scdn.co/image/ab67616d0000b273b7ce24c3fe0b15f535e03ae6',
      'https://i.scdn.co/image/ab67616d0000b2731d03b5e88cee6870778a4d27'
    ],
  },
  {
    title: '2010s hits',
    albums: [
      'https://upload.wikimedia.org/wikipedia/en/5/51/Igor_-_Tyler%2C_the_Creator.jpg',
      'https://m.media-amazon.com/images/I/71v9YKQxm2L._UF1000,1000_QL80_.jpg',
      'https://upload.wikimedia.org/wikipedia/en/3/32/Rihanna_-_Anti.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbTZERsA0SzGETJAm4HuvOP0Sr20KRQHUrFA&s',
      'https://i.scdn.co/image/ab67616d00001e0296fa88fb1789be437d5cb4b6',
      'https://i.scdn.co/image/ab67616d0000b273aaa10f339ed589b84c51137d',
    ],
  },

];

export default function ProfileScreen() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      async function loadReviews() {
        setLoading(true);
        const posts = await fetchData();
        if (posts) {
          const formatted: Review[] = posts.map((p: PostData) => ({
            title: p.song,
            artist: p.artist,
            review: p.content,
            image: p.cover,
          }));
          setReviews(formatted);
        }
        setLoading(false);
      }
  
      loadReviews();
    }, [])
  );
  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }
  return (
    <ScrollView style={styles.container}>
      {/* profile header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://preview.redd.it/220728-phoning-update-hanni-photos-v0-i5cdr2pcy9e91.jpg?width=640&crop=smart&auto=webp&s=2f52e1438ebf3a27f58627d9f03c506d65895251' }} // default profile pic
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.name}>hanni pham</Text>
          <Text style={styles.bio}>member of newjeans 🎵</Text>
        </View>
      </View>

      {/* my reviews */}
      <Text style={styles.sectionTitle}>My Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(r => r.title + r.artist)}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={330 + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Image source={{ uri: item.image }} style={styles.reviewImage} />
            <View style={styles.reviewTextContainer}>
              <Text style={styles.reviewTitle}>{item.title}</Text>
              <Text style={styles.reviewSubtitle}>{item.artist}</Text>
              <Text style={styles.reviewBody}>{item.review}</Text>
            </View>
          </View>
        )}
      />

      {/* my lists */}
      <Text style={styles.sectionTitle}>My Lists</Text>
      <FlatList
        data={albumLists}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={330 + 16}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listCard}>
            <Text style={styles.listTitle}>{item.title}</Text>
            <View style={styles.albumGrid}>
              {item.albums.map((uri, idx) => (
                <Image key={idx} source={{ uri }} style={styles.albumImage} />
              ))}
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#641346',
    },
    header: { // bio area
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      backgroundColor: '#e6a8b8',
      height: 200,
      justifyContent: 'center',
      paddingTop: 40
    },
    profilePic: {
      width: 130,
      height: 130,
      borderRadius: 80,
      marginRight: 20
    },
    name: { // user name
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: "Afacad",
      letterSpacing: 1.5,
      marginBottom: 5
    },
    bio: { // user bio
      width: "100%",
      fontFamily: "Afacad",
      fontSize: 17
    },
    sectionTitle: { // section headings
      fontFamily: "Afacad",
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 16,
      marginTop: 15,
      color: 'white',
      letterSpacing: 1
    },
    reviewCard: { 
      flexDirection: 'row',
      backgroundColor: '#3d084e',
      marginTop: 10,
      marginLeft: 16,
      borderRadius: 25,
      overflow: 'hidden',
      height: 230,
      width: 330
    },
    reviewImage: {
      width: 120,
      height: '100%',
      alignSelf: 'stretch',
      resizeMode: 'cover',
      
    },
    reviewTextContainer: {
      flex: 1,
      padding: 12,
      backgroundColor: '#a36892',
      alignItems: 'center',
    },
    reviewTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: "Afacad",
      letterSpacing: 1,
      textAlign: 'center'
    },
    reviewSubtitle: {
      fontFamily: "Afacad",
      letterSpacing: 1,
      fontSize: 14,
      marginBottom: 8,
      textAlign: 'center'
    },
    reviewBody: {
      fontSize: 13,
      fontFamily: "Afacad",
      color: 'white' 
    },
    listCard: {
      flexDirection: 'column',
      backgroundColor: '#a36892',
      marginTop: 10,
      marginLeft: 16,
      borderRadius: 25,
      overflow: 'hidden',
      height: 230,
      width: 330,
      
    },
    listTitle: {
      fontWeight: 500,
      fontSize: 20,
      fontFamily: "Afacad",
      letterSpacing: 2,
      marginTop: 10,
      textAlign: 'center',
    },
    albumGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignSelf: 'center',
      width: 300
    },
    albumImage: {
      width: 90,
      height: 90,
      aspectRatio: 1,
      resizeMode: 'cover',
    },
  });
  