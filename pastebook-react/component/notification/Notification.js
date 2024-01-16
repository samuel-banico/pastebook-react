import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import SingleNotif from './SingleNotif'

const Notification = () => {
  return (
    <View style={[globalStyle.colorBackground]}>
        <View style={globalStyle.alignToColumn}>
            <Text style={globalStyle.textTitle}>Notifications</Text>
            <TouchableOpacity>
                <Text>ALL</Text>
            </TouchableOpacity>
        </View>
        <ScrollView>
            <SingleNotif/>
        </ScrollView>   
    </View>
    
  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})