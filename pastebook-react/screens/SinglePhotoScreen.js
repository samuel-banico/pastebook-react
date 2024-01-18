import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SinglePhoto from '../component/singlePhoto/SinglePhoto'

const SinglePhotoScreen = () => {
  return (
    <View style={styles.container}>
        <SinglePhoto/>
    </View>
  )
}

export default SinglePhotoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})