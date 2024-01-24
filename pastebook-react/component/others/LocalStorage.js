import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTokenData = async (value) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (e) {
        console.log('Set Token Error: ' + e.message)
    }
}

export const getTokenData = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        return value ? value : null;
    } catch (e) {
        console.log('Geta Token Error: ' + e.message)
    }
}

export const removeTokenData = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch {
        console.log('Token to delete Error')
    }
}