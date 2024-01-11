import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../component/navbar/Header'
import Post from '../component/home/Post'
import Feed from '../component/home/Feed'

const FeedScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation}/>
      <Post navigation={navigation}/>
      <Feed/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'gray',
        flex: 1,
        marginTop: 20
    }
})

export default FeedScreen