import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ProfileAlbum from '../../component/profile/ProfileAlbum'

const AlbumsScreen = ({navigation}) => {
  return (
    <View>
      <ProfileAlbum navigation={navigation}/>
    </View>
  )
}

export default AlbumsScreen

const styles = StyleSheet.create({})