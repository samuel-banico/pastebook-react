import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleOnlineFriend from './SingleOnlineFriend'


const FriendsOnline = () => {
  return (
    <ScrollView contentContainerStyle={[styles.container, globalStyle.colorBackground]} 
    horizontal={true} showsHorizontalScrollIndicator={false}>
        <SingleOnlineFriend/>
        <SingleOnlineFriend/>
        <SingleOnlineFriend/>
        <SingleOnlineFriend/>
        <SingleOnlineFriend/>
    </ScrollView>
  )
}

export default FriendsOnline

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingTop: 8
    }
})