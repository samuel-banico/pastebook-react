import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import EvilIcons from '@expo/vector-icons/EvilIcons'
import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const SinglePhoto = () => {
  return (
    <View style={styles.container}>
        <View styles={styles.contentContainer}>
            <Image
                resizeMode='contain'
                style={styles.img}
                source={require('../../assets/img/image.png')}/>
        </View>
                 
        <View style={styles.footer}>
            <HR/>
            <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                <TouchableOpacity>
                    <Text>❤️ #Like</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text># Comments</Text>
                </TouchableOpacity>
            </View>

            <HR/>

            <View style={[globalStyle.alignToColumn, {alignItems: 'center', justifyContent: 'space-evenly'}]}>
                <TouchableOpacity style={globalStyle.alignToColumn}>
                    <EvilIcons name='heart' size={25}/>
                    <Text style={{paddingTop: 2}}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.alignToColumn}>
                    <EvilIcons name='comment' size={25}/>
                    <Text style={{paddingTop: 2}}>Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </View>
  )
}

export default SinglePhoto

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        paddingHorizontal: 15,
        height: 90,
    },
    img: {
        width: '100%'
    },
    })