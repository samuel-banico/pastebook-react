import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import CreateAlbum from '../component/album/CreateAlbum'

const CreateAlbumScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CreateAlbum navigation={navigation}/>
    </View>
  )
}

export default CreateAlbumScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})