import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleOnlineFriend from './SingleOnlineFriend'


const FriendsOnline = ({online}) => {

  const checkOnline = (obj) => {
    return !(obj === null || Object.keys(obj).length === 0);
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, globalStyle.colorBackground]} 
    horizontal={true} showsHorizontalScrollIndicator={false}>
        {
          checkOnline(online) ? online.map((item) => {
            <SingleOnlineFriend key={item.id} item={item}/>
          }) :
          <View style={styles.textContainer}>
            <Text>No Online Friend/s</Text>
          </View>
        }
    </ScrollView>
  )
}

export default FriendsOnline

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 8
    },
    textContainer : {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})