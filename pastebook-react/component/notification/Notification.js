import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import SingleNotif from './SingleNotif'

const Notification = () => {
  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <ScrollView contentContainerStyle={{paddingBottom: 5}} showsVerticalScrollIndicator={false}>
            <View style={[globalStyle.alignToColumn, styles.headerContainer]}>
                <Text style={globalStyle.textTitle}>Notifications</Text>
                <TouchableOpacity style={[{paddingTop: 2}]}>
                    <Text>ALL</Text>
                </TouchableOpacity>
            </View>

            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
            <SingleNotif/>
        </ScrollView>   
    </View>
    
  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    }
})