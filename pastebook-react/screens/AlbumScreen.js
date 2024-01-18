import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Album from '../component/album/Album'

const AlbumScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Album navigation={navigation}/>
    </View>
  )
}

export default AlbumScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})