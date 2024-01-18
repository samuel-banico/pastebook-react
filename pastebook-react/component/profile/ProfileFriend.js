import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleFriend from './SingleFriend'

const ProfileFriend = () => {
  return (
    <View style={[styles.container]}>

        <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
            <Text style={[globalStyle.textTitle]}>Friends</Text>
            <Text>#Friends</Text>
        </View>

        <View style={[styles.friendContainer]}>
            <View style={[globalStyle.alignToColumn, styles.friendListContainer]}>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
                <SingleFriend/>
            </View>
        </View>
    </View>
  )
}

export default ProfileFriend

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10
    }, 
    titleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    friendContainer: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    friendListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
    
})