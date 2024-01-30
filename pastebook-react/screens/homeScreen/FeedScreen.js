import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import Post from '../../component/home/Post'
import Feed from '../../component/home/Feed'
import FriendsOnline from '../../component/home/FriendsOnline'

const FeedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FriendsOnline navigation={navigation}/>
        <Post navigation={navigation} enableProfileTransfer={true}/>
        <Feed navigation={navigation}/>
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