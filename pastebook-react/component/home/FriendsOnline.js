import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleOnlineFriend from './SingleOnlineFriend'

import { getOnlineFriends } from './HomeService'
import { getTokenData } from '../others/LocalStorage'

const FriendsOnline = ({navigation}) => {

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async() => {
      var token = await getTokenData();

      await getOnlineFriends(token)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }

    fetchData();
  }, [])

  const checkOnline = (obj) => {
    return !(obj === null || Object.keys(obj).length === 0);
  }

  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      <View style={[globalStyle.alignToColumn, {paddingBottom: 10}]}>
        <Image style={styles.img}
          source={require('../../assets/img/online.png')}/>
        <Text style={{paddingLeft: 5}}>Online</Text>
        {
          checkOnline(data) && <Text>▫️{data.length}</Text>
        }
      </View>
      <ScrollView contentContainerStyle={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          checkOnline(data) ? data.map((item) => (
            <SingleOnlineFriend key={item} item={item} navigation={navigation}/>
          )) :
          <View style={styles.textContainer}>
            <Text>No Online Friend/s</Text>
          </View>
        }
      </ScrollView>
    </View>
    
  )
}

export default FriendsOnline

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    textContainer : {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    img : {
      width: 15,
      height: 15
    }
})