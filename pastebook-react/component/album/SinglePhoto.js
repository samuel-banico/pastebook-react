import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SinglePhoto = ({navigation}) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
        <Image
            style={styles.img}
            source={require('../../assets/img/image.png')}/>
        </TouchableOpacity>    
    </View>
  )
}

export default SinglePhoto

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    img: {
        width: 100,
        height: 100,
      }
})