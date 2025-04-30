import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from "@react-navigation/stack";


type RootStackParamList = {
    profile: undefined;
   
  };

  type ProfileNavProp = StackNavigationProp<RootStackParamList, "profile">;


export default function PostScreen() {
const navigation = useNavigation<ProfileNavProp>();
  const { songTitle, songArtist, content, cover } = useRoute().params as {
    songTitle: string;
    songArtist: string;
    content: string;
    cover: string;
  };

  return (
    <View style={styles.screen}>
      {/* Back button */}

      

      <ScrollView contentContainerStyle={styles.scroll}>
      
        <View style={styles.card}>
        
          {/* Title */}
          <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => navigation.navigate("profile")} style={styles.backThing} hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}>
              <Ionicons name="play-back" size={35} color="#333" style={{ marginRight: 8 }} />
        </TouchableOpacity>
            <Text style={styles.titleText}>{songTitle}</Text>
            
          </View>
          <Text style={styles.subtitle}>{songArtist}</Text>
          <Text style={styles.handle}>@mirandas_music</Text>

          {/* Circular cover */}
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <Image source={{ uri: cover }} style={styles.coverImage} />
            </View>
          </View>

          {/* Content */}
          <Text style={styles.contentText} >{content}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const PURPLE = '#641346';
const CARD_BG = '#F3F3F3';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
  },
  scroll: {
    flexGrow: 1,              // allow centering when content is short
    justifyContent: 'center', // center vertically
    alignItems: 'center',     // center horizontally
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  card: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleText: {
    flex: 1,
    fontSize:  30,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Afacad',
  },
  subtitle: {
    fontSize: 20,
    color: '#555',
    fontFamily: 'Afacad',
    marginBottom: 4,
    textAlign: 'center',
  },
  handle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  circleOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  backThing: { 
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F3F3', // optional: if you want a circle behind the arrow
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    left: 10,
  },
  circleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'left',
    fontFamily: 'Afacad',
  },
});

