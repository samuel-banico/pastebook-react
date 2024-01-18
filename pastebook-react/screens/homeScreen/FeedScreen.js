import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'

import Post from '../../component/home/Post'
import Feed from '../../component/home/Feed'
import FriendsOnline from '../../component/home/FriendsOnline'

import globalStyle from '../../assets/styles/globalStyle'

const FeedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FriendsOnline/>
        <Post navigation={navigation}/>
        <Feed/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    }
})

export default FeedScreen