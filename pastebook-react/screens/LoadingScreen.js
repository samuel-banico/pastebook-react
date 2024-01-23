import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

import globalStyle from '../assets/styles/globalStyle';

const LoadingScreen = () => {
    return (
        <View style={[styles.container, globalStyle.colorBackground]}>
            <Image
                style={styles.logo}
                source={require('../assets/img/logo.png')}/>
            <ActivityIndicator size="large" color='#7ed3bb' />
            <Text>Loading...</Text>
        </View>
    );
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 500,
        height: 150,
        resizeMode: 'contain',
    }
});