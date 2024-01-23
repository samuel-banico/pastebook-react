import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import HR from '../others/HR'

const SinglePost = ({navigation}) => {

    const [like, setLike] = useState(false)

    const toggleLike = () => setLike(!like)
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
            <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'like'})}>
                <Text>❤️ #Like</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'comment'})}>
                <Text># Comments</Text>
            </TouchableOpacity>
        </View>

        <HR/>

        <View style={[globalStyle.alignToColumn, {alignItems: 'center', justifyContent: 'space-evenly'}]}>
            <TouchableOpacity  onPress={toggleLike}>
                {
                    like ? 
                        <View style={globalStyle.alignToColumn}>
                            <Text style={{fontSize: 15}}>❤️</Text>
                            <Text style={{paddingTop: 2}}> Like</Text>
                        </View> : 
                        <View style={globalStyle.alignToColumn}>
                            <EvilIcons name='heart' size={25}/>
                            <Text style={{paddingTop: 2}}>Like</Text>
                        </View>
                }
                
            </TouchableOpacity>
            <TouchableOpacity style={globalStyle.alignToColumn} onPress={() => navigation.navigate('Post', {data:'focus'})}>
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