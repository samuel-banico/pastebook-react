import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Home from '../component/home/Home'

import LoadingScreen from './LoadingScreen';

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Home navigation={navigation}/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})