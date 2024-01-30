import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import globalStyle from '../assets/styles/globalStyle'

import SinglePost from '../component/singlePost/SinglePost'

const SinglePostScreen = ({route, navigation}) => {
  const {data} = route.params;
  const {item} = route.params;

  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      
      <SinglePost selection={data} data={item} navigation={navigation}/>
    </View>
  )
}

export default SinglePostScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})