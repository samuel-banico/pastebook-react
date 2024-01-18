import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleRequest from './SingleRequest'

const FriendRequest = () => {
  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.alignToColumn, {alignItems: 'center', marginTop: 10}]}>
                <Text style={globalStyle.textTitle}>Friend Requests</Text>
                <Text>▫️#Number</Text>
            </View>
            <SingleRequest/>
            <SingleRequest/>
            <SingleRequest/>
            <SingleRequest/>
            <SingleRequest/>

            <SingleRequest/>

            <SingleRequest/>

        </ScrollView>
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
    },
    alignToColumn: {
        flexDirection: 'row'
    }
})