import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SinglePhoto from '../component/singlePhoto/SinglePhoto'

const SinglePhotoScreen = ({route, navigation}) => {
  const {id} = route.params;

  return (
    <View style={styles.container} >
        <SinglePhoto id={id} navigation={navigation}/>
    </View>
  )
}

export default SinglePhotoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})