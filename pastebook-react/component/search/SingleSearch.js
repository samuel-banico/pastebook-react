import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const SingleSearch = ({navigation, item}) => {

  const onPress = () => {
    navigation.navigate('Profile', {id: item.userId} )
  }

  return (
    <View >
      <TouchableOpacity style={[globalStyle.alignToColumn, styles.container]} onPress={onPress}>
        <Image
        style={styles.img} 
        source={{uri: item.profilePicture}}/>
        <Text>{item.fullname}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SingleSearch

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      alignItems: 'center'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    }
})