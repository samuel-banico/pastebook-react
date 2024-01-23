import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SinglePost from './SinglePost'
const Feed = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>
      <SinglePost navigation={navigation}/>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 2,
      paddingBottom: 10
    }
})

export default Feed