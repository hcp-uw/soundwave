import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons'

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://link-to-image' }} // your profile pic
          style={styles.profilePic}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>Chappell Roan</Text>
          <Text style={styles.bio}>I love music & hate performing & talking abt politics! 🎵</Text>
        </View>
      </View>

      {/* My Reviews */}
      <Text style={styles.sectionTitle}>My Reviews</Text>
      <View style={styles.reviewCard}>
        <Image source={{ uri: 'https://link-to-margot-cover' }} style={styles.reviewImage} />
        <View style={styles.reviewTextContainer}>
          <Text style={styles.reviewTitle}>MARGOT</Text>
          <Text style={styles.reviewSubtitle}>Telenova</Text>
          <Text style={styles.reviewBody}>
            alskdjf;alskdjf;alskdjf... (truncated review text)
          </Text>
        </View>
      </View>

      {/* My Lists */}
      <Text style={styles.sectionTitle}>My Lists</Text>
      <View style={styles.listCard}>
        <Text style={styles.listTitle}>My Favorite 2010s Songs</Text>
        <View style={styles.albumGrid}>
          {['img1', 'img2', 'img3', 'img4', 'img5', 'img6'].map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: 'https://link-to-album-cover' }} // replace with real URIs
              style={styles.albumImage}
            />
          ))}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={28} color="white" />
        <Ionicons name="add-outline" size={32} color="white" />
        <Ionicons name="person-outline" size={28} color="white" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fdd6ec',
    },
    header: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      backgroundColor: '#fdd6ec',
    },
    profilePic: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    bio: {
      maxWidth: 240,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 16,
      marginTop: 20,
      color: 'white',
    },
    reviewCard: {
      flexDirection: 'row',
      backgroundColor: '#3d084e',
      margin: 16,
      borderRadius: 16,
      overflow: 'hidden',
    },
    reviewImage: {
      width: 120,
      height: 120,
    },
    reviewTextContainer: {
      flex: 1,
      padding: 12,
      backgroundColor: '#b387b5',
    },
    reviewTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    reviewSubtitle: {
      fontStyle: 'italic',
      marginBottom: 8,
    },
    reviewBody: {
      fontSize: 12,
    },
    listCard: {
      backgroundColor: '#3d084e',
      borderRadius: 16,
      margin: 16,
      padding: 12,
    },
    listTitle: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 12,
      color: 'white',
    },
    albumGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    albumImage: {
      width: '30%',
      aspectRatio: 1,
      borderRadius: 8,
      marginBottom: 8,
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#3d084e',
      padding: 12,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
  });
  