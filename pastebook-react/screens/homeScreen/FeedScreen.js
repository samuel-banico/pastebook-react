import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'

import Post from '../../component/home/Post'
import Feed from '../../component/home/Feed'

import globalStyle from '../../assets/styles/globalStyle'

const FeedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Post navigation={navigation}/>
      <Feed/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    }
})

export default FeedScreen