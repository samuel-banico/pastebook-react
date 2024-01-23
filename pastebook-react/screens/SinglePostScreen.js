import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import globalStyle from '../assets/styles/globalStyle'

import SinglePost from '../component/singlePost/SinglePost'

const SinglePostScreen = () => {
  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      <SinglePost/>
    </View>
  )
}

export default SinglePostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})