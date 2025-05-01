import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

const COVER_WIDTH = Dimensions.get('window').width * 0.8
const COVER_HEIGHT = COVER_WIDTH

type CoverStackProps = { uri: string }

export const CoverStack: React.FC<CoverStackProps> = React.memo(({ uri }) => (
  <View style={styles.wrapper}>
    <Image
      source={{ uri }}
      style={[styles.coverBase, styles.backMost]}
      resizeMode="cover"
    />
    <Image
      source={{ uri }}
      style={[styles.coverBase, styles.back]}
      resizeMode="cover"
    />
    <Image
      source={{ uri }}
      style={[styles.coverBase, styles.coverFront]}
      resizeMode="cover"
    />
  </View>
))
const styles = StyleSheet.create({
    wrapper: {
      position: 'relative',  
      width: COVER_WIDTH,
      height: COVER_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    coverBase: {
      position: 'absolute',
      width: COVER_WIDTH * 0.9,
      height: COVER_HEIGHT * 0.9,
      borderRadius: 0,
      borderWidth: 1,
      borderColor: '#eee',
    },
    backMost: {
      transform: [
        //{ rotate: '-6deg' },
        { translateX: 20 },
        { translateY: -20 },
      ],
      zIndex: 1,
    },
    back: {
        zIndex: 2,
        transform: [
          //{ rotate: '-3deg' },
          { translateX: 10 },
          { translateY: -10 },
        ],
    },
    coverFront: {
        zIndex: 3,
        width: COVER_WIDTH * 0.9,   // front slightly larger
        height: COVER_HEIGHT * 0.9,
        // no position needed here since it's merged with `coverBase`
        transform: [],
    },
  })
  