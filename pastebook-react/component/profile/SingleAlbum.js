import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SingleAlbum = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Album')}>
        <Image
        style={styles.img} 
        source={require('../../assets/img/album.png')}/>
        <Text>Album Title</Text>
        <Text># Photos</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SingleAlbum

const styles = StyleSheet.create({
    img: {
        width: 150,
        height: 150
    }
})