import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

import HR from '../others/HR'

const Search = () => {
  return (
    <View>
      <View style={styles.roundedContainer}>
        <TextInput placeholder='Search...'/>
      </View>
      <HR/>
      <Text>Content Here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  roundedContainer: {
    borderRadius: 10,
    backgroundColor: 'gray',
    padding: 5
  }
})

export default Search