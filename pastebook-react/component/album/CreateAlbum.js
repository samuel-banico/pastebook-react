import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const CreateAlbum = () => {
  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <TextInput
            autoFocus={true}
            placeholder='Album Name'/>
        <TextInput
            placeholder='Album Description'/>
        <HR/>
        <View style={styles.photoContainer}>
            <View style={[globalStyle.alignToColumn, styles.photoListContainer]}>
                <TouchableOpacity>
                    <Image
                        resizeMode='contain'
                        style={styles.img}
                        source={require('../../assets/img/add_image.png')}/>
                </TouchableOpacity>
                <View>
                    
                </View>
            </View>
        </View>

    </View>
  )
}

export default CreateAlbum

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical:10
    }, 
    photoContainer: {
        flex: 1,
        paddingTop: 10
    },
    photoListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    img: {
        width: 100,
        height: 100,
    }
})