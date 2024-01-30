import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ProfilePost from '../../component/profile/ProfilePost'

const PostsScreen = ({navigation, userId}) => {
  return (
    <View>
      <ProfilePost navigation={navigation} userId={userId}/>
    </View>
  )
}

export default PostsScreen

const styles = StyleSheet.create({})