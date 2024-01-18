import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleAlbum from './SingleAlbum'
const ProfileAlbum = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
            <Text style={[globalStyle.textTitle]}>Album</Text>
            <Text>#Album</Text>
        </View>
        
        <View style={styles.albumContainer}>
            <View style={[globalStyle.alignToColumn, styles.albumListContainer]}>
                <TouchableOpacity onPress={() => navigation.navigate('Create Album')}>
                    <View>
                        <Image 
                        style={styles.img} 
                        source={require('../../assets/img/add_album.png')}/>
                        <Text>Create Album</Text>
                    </View>
                </TouchableOpacity>
                <SingleAlbum navigation={navigation}/>
                <SingleAlbum navigation={navigation}/>
                <SingleAlbum navigation={navigation}/>
                <SingleAlbum navigation={navigation}/>
            </View>
        </View>
    </View>
  )
}

export default ProfileAlbum

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    titleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    albumContainer: {
        flex: 1,
        paddingTop: 10
    },
    albumListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    img: {
        width: 150,
        height: 150
    }
})