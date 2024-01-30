import { ScrollView, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'

import * as ImagePicker from 'expo-image-picker';

import globalStyle from '../../assets/styles/globalStyle'

import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import AwesomeAlert from 'react-native-awesome-alerts';

import HR from '../others/HR'
import SinglePhoto from './SinglePhoto'
import { deleteAlbumById, getAlbumDetailsById } from './AlbumService';

const Album = ({navigation, id}) => {
  
  const[loading, setLoading] = useState(true)
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      await getAlbumDetailsById({id: id})
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('ERROR: Album')
        console.log(error)
      })

      setLoading(false);
    }

    fetchData();
  }, [])

  const [state, setState] = useState(false)

  const showAlert = () => {
    setState(true);
  };

  const hideAlert = () => {
    setState(false);
  };

  const deleteAlbum = async() => {
    await deleteAlbumById({id: id})
    .then(response => {
      setState(false)
      navigation.goBack()
    })
    .catch(error => {
      console.log('ERROR: Album, deleting album')
      console.log(error)
    })
  }

  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      {
        loading ? null :
        <ScrollView>
          <View>
            <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
              <Text style={globalStyle.textTitle}>{data.albumName}</Text>
              <View style={[globalStyle.alignToColumn]}>
                <TouchableOpacity>
                  <FontAwesome5 name='edit' size={20}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={showAlert}>
                  <MaterialIcons name='delete-forever' size={30}/>
                </TouchableOpacity>
              </View>
            </View>
            <Text>{data.albumDescription}</Text>
            <Text style={globalStyle.textParagraph}>{data.dateCreated}</Text>
          </View>

          <HR/>

          <View style={[styles.photoContainer]}>
            <View style={[styles.photosCountContainer, globalStyle.alignToColumn]}>
              <Text>Photos▫️{data.imageCount}</Text>
            </View>
            <View style={[globalStyle.alignToColumn, styles.photoListContainer]}>
              {
                (data.images).map((item) => (
                  <SinglePhoto key={item} item={item} navigation={navigation}/>
                ))
              }
            </View>
          </View>

          <AwesomeAlert
            show={state}
            showProgress={false}
            title="Delete Forever"
            message="Are you sure you want to delete this album?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={hideAlert}
            onConfirmPressed={deleteAlbum}/>
        </ScrollView>
      }
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
  photosCountContainer: {
    justifyContent: 'space-between', 
    marginBottom: 10
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