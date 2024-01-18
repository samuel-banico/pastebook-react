import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Post from '../../component/home/Post'
import SinglePost from '../../component/home/SinglePost'

const ProfilePost = () => {
  return (
    <View style={[styles.container]}>
        <Post/>
        <SinglePost/>
        <SinglePost/>
        <SinglePost/>
        <SinglePost/>
    </View>
  )
}

export default ProfilePost

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})