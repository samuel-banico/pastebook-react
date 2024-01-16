import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SingleRequest from './SingleRequest'

const FriendRequest = () => {
  return (
    <View>
        <View style={styles.alignToColumn}>
            <Text>Friend Requests</Text>
            <Text>(Number)</Text>
        </View>
        <ScrollView>
            <SingleRequest/>
        </ScrollView>
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    alignToColumn: {
        flexDirection: 'row'
    }
})