import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import SinglePhotoDetails from './SinglePhotoDetails'

const SinglePhoto = ({navigation, id}) => {
    return (
        <View style={styles.container} >
            <SinglePhotoDetails id={id} navigation={navigation}/>
        </View>
    )
}

export default SinglePhoto

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})