import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const SingleSearch = () => {
  return (
    <View style={[globalStyle.alignToColumn, styles.container]}>
      <Image
      style={styles.img} 
      source={require('../../assets/img/user.png')}/>
      <Text>FirstName LastName</Text>
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
        borderRadius: 25
    }
})