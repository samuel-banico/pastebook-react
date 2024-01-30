import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Album from '../component/album/Album'

const AlbumScreen = ({route, navigation}) => {

  const {data} = route.params

  return (
    <View style={styles.container}>
      <Album navigation={navigation} id={data}/>
    </View>
  )
}

export default AlbumScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})