import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SinglePost from './SinglePost'
const Feed = ({navigation, feed}) => {

  const checkFeed = (obj) => {
    return !(obj === null || Object.keys(obj).length === 0);
  }

  return (
    <View style={styles.container}>
      {
        checkFeed(feed) ? feed.map((item) => (
          <SinglePost key={item.id} item={item} navigation={navigation}/>
        )) : 
        <View style={styles.textContainer}>
          <Text>No Available Post</Text>
        </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 2,
      paddingBottom: 10
    },
    textContainer : {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }
})

export default Feed