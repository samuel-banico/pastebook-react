import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';


import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'
import { createAlbum, createImageForAlbum } from './AlbumService';
import { getTokenData } from '../others/LocalStorage';
import Toast from 'react-native-toast-message';

const CreateAlbum = ({navigation}) => {
    const [image, setImage] = useState([]);

    const [albumDetails, setAlbumDetails] = useState({
        albumName: '',
        albumDescription: ''
    })

    const albumDetailsOnChange = (fieldName, value) => {
        setAlbumDetails({
            ...albumDetails,
            [fieldName]: value
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) { 
            setImage(prevArray => [...prevArray, result.assets[0].uri]);
        }
    };

    const handleAlbumCreation = async() => {
        var token = await getTokenData();

        await createAlbum(token, albumDetails)
        .then(response => {
            try {
                image.forEach(img => {
                    handleAlbumImageCreation(response.data, img)
                });

                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Album Added Successfully'
                })

                navigation.goBack()
            } catch (error) {
                console.log('ERROR: Uploading Images')
                console.log(error)
            }
            
        })
        .catch(error => {
            console.log('ERROR: Creating Album')
            console.log(error)
        })
    }

    const handleAlbumImageCreation = async(albumId, imageUri) => {

        const formData = new FormData();

        formData.append('image', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'myFile.jpg'
        });

        await createImageForAlbum(albumId, formData)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('ERROR: Uploading Images')
            console.log(error)
        })
    }

    const onClickSubmit = () => {
        handleAlbumCreation();
    }

    return (
        <View style={[globalStyle.colorBackground, styles.container]}>
            <TextInput
                style={[globalStyle.textInputBox]}
                autoFocus={true}
                placeholder='Album Name'
                value={albumDetails.albumName}
                onChangeText={(e) => albumDetailsOnChange('albumName', e)}/>
            <TextInput
                style={[globalStyle.textInputBox]}
                placeholder='Album Description'
                value={albumDetails.albumDescription}
                onChangeText={(e) => albumDetailsOnChange('albumDescription', e)}/>
            <TouchableOpacity style={[styles.button, globalStyle.colorSecondaryBG]} onPress={onClickSubmit}>
                <Text>
                    Create Album
                </Text>
            </TouchableOpacity>
            <HR/>
            <View style={styles.photoContainer}>
                <View style={[globalStyle.alignToColumn, styles.photoListContainer]}>
                    <TouchableOpacity onPress={pickImage}>
                        <Image
                            resizeMode='contain'
                            style={styles.img}
                            source={require('../../assets/img/add_image.png')}/>
                    </TouchableOpacity>
                    {
                        image.length > 0 ? 
                        image.map((img, index) => (
                            <Image key={index}  style={styles.img} source={{uri: img}}/>
                        )) : null
                    }
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
        paddingVertical:10,
        alignItems: 'center'
    }, 
    photoContainer: {
        flex: 1,
        paddingTop: 10
    },
    photoListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    img: {
        width: 100,
        height: 100,
        margin: 5
    }
})