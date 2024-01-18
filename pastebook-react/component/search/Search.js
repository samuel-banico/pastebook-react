import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'
import SingleSearch from './SingleSearch'

const Search = () => {
  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
      <View style={[styles.roundedContainer]}>
        <TextInput autoFocus={true} placeholder='Search...'/>
      </View>
      <HR/>
      <ScrollView>
        <SingleSearch/>
        <SingleSearch/>
        <SingleSearch/>
        <SingleSearch/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1
  },
  roundedContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5
  }
})

export default Search