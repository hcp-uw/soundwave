import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from "@react-navigation/native";
import RoundedRectangle from "@/components/RoundedRectangle";

// parameters for review card
export interface PostData {
    postId: string;
    song: string;
    artist: string;
    content: string;
    cover: string;
  }

export default function PostScreen() {
  const route = useRoute();
  const { songTitle, songArtist, content, cover } = route.params as { songTitle: string; songArtist: string, content:string, cover:string };
  const songName = songTitle;
  const artistName = songArtist;
  const songCover = cover;
  const postContent = content;
  
  return (
    <ScrollView style={styles.container}>

    <RoundedRectangle>
        <View>
            <Image source={{uri: songCover}} style={styles.cover}></Image>
            <Text style={ styles.songTitle }>
                {`${songName} `}
            </Text>
            <Text style= {styles.artistName}>
                {`${artistName}`}
            </Text>
            <Text style= {styles.reviewBody}>
                {`${postContent}`}
            </Text>
        </View>
    </RoundedRectangle>

    {/* 
    add back button 
    add navigation from home screen
    add navigation from profile
    (?) add navigation from search results (after post is created, navigates to this page)
    */}
      
    </ScrollView>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#641346',
    },
    cover: {
      width: 130,
      height: 130,
      aspectRatio: 1,
      alignItems: 'center',
      resizeMode: 'cover',
    },
    songTitle: { 
        paddingTop: 15,
        fontFamily: "Afacad",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
      },
      artistName: { 
        fontFamily: "Afacad",
        fontSize: 18,
        textAlign: "center",
        paddingBottom: 10,
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
    
    albumImage: {
      width: 90,
      height: 90,
      aspectRatio: 1,
      resizeMode: 'cover',
    },
  });
  