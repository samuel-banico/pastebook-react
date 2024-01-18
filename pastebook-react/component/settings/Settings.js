import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Logout from './Logout'
import Security from './Security'
import YourProfile from './YourProfile'
import HR from '../others/HR'

import globalStyle from '../../assets/styles/globalStyle'

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyle.colorBackground, styles.container]}>
        <View>
            <View>
                <YourProfile navigation={navigation}/>
            </View>
            <HR/>
            <Security navigation={navigation}/>
            <Logout navigation={navigation}/>
        </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})