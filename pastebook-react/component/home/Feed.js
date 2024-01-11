import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Feed = () => {
  return (
    <View style={styles.feedContainer}>
      <Text>Feed</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    feedContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    img: {
        width: 30,
        height: 30
    }
})

export default Feed