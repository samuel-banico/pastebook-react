import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, {useEffect} from 'react'

import Post from '../../component/home/Post'
import Feed from '../../component/home/Feed'
import FriendsOnline from '../../component/home/FriendsOnline'

import globalStyle from '../../assets/styles/globalStyle'

const FeedScreen = ({navigation, details}) => {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FriendsOnline online={details.onlineFriends}/>
        <Post navigation={navigation} user={details.user}/>
        <Feed navigation={navigation} feed={details.feed} />
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