import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const SingleRequest = () => {
  return (
    <View style={[globalStyle.alignToColumn, styles.container]}>
        <Image 
            source={require('../../assets/img/user.png')}
            style={styles.img}
        />
        <View style={[styles.detailsContainer]}>
            <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                <Text>Name</Text>
                <Text>Date Requested</Text>
            </View>
            <Text>Mutual Friends</Text>
            <View style={[globalStyle.alignToColumn, styles.buttonContainer]}>
                <TouchableOpacity style={[styles.button, globalStyle.colorPimaryBG]}>
                    <Text style={[styles.buttonText]}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, globalStyle.colorSecondaryBG]}>
                    <Text style={[styles.buttonText]}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default SingleRequest

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    detailsContainer: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 5,
        justifyContent: 'space-between',
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 5
    },
    button: {
        width: 120,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: 600
    }
})