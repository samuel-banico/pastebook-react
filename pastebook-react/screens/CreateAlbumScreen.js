import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import CreateAlbum from '../component/album/CreateAlbum'

const CreateAlbumScreen = () => {
  return (
    <View style={styles.container}>
      <CreateAlbum/>
    </View>
  )
}

export default CreateAlbumScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})