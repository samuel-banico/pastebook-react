import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import HR from '../others/HR'

const SinglePost = () => {
  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <View style={[globalStyle.alignToColumn, {alignItems: 'center'}]}>
            <Image 
                style={styles.img} 
                source={require('../../assets/img/user.png')}/>
            <View style={{paddingLeft: 10}}>
                <Text>FirstName LastName</Text>
                <View style={globalStyle.alignToColumn}>
                    <Text>Time▫️🌐/🫂</Text>
                </View>
            </View>
        </View>

        <Text style={{flex: 1, paddingVertical: 6}}>
            POST 2000 characters
        </Text>

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
  )
}

export default SinglePost

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
})