import { ScrollView, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

import * as ImagePicker from 'expo-image-picker';

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'
import SinglePhoto from './SinglePhoto'

const Album = ({navigation}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      <ScrollView>
        <View>
          <Text>Album Name</Text>
          <Text>Album Description</Text>
          <Text>Date Created</Text>
        </View>

        <HR/>

        <View style={[styles.photoContainer]}>
          <View style={[globalStyle.alignToColumn, styles.photoListContainer]}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    resizeMode='contain'
                    style={styles.img}
                    source={require('../../assets/img/add_image.png')}/>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <SinglePhoto navigation={navigation}/>
            <SinglePhoto navigation={navigation}/>
            <SinglePhoto navigation={navigation}/>
            <SinglePhoto navigation={navigation}/>
            <SinglePhoto navigation={navigation}/>
            <SinglePhoto navigation={navigation}/>

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Album

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10
  }, 
  photoContainer: {
    flex: 1,
    paddingTop: 10
  },
  photoListContainer: {
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  img: {
    width: 80,
    height: 80,
  }  
})