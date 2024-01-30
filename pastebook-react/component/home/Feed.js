import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SinglePost from './SinglePost'

import { getTokenData } from '../others/LocalStorage'
import { getFeedPosts } from './HomeService'

const Feed = ({navigation}) => {

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async() => {
      var token = await getTokenData();

      await getFeedPosts(token)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }

    fetchData()
  }, [])

  const checkFeed = (obj) => {
    return !(obj === null || Object.keys(obj).length === 0);
  }

  return (
    <View style={styles.container}>
      {
        checkFeed(data) ? data.map((item) => (
          <SinglePost key={item} item={item} navigation={navigation}/>
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