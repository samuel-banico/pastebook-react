import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SinglePost from './SinglePost'
const Feed = () => {
  return (
    <ScrollView contentContainerStyle={[globalStyle.colorBackground]}>
      <SinglePost/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    
})

export default Feed