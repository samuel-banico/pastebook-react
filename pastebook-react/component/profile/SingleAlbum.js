import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAlbumById } from './ProfileService';
import globalStyle from '../../assets/styles/globalStyle';

const SingleAlbum = ({navigation, item}) => {

  const [data, setData] = useState({});
  
  useEffect(() => {
    const fetchData = async() => {
      await getAlbumById({id: item})
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('ERROR: Single Album')
        console.log(error.response.data)
      })
    }
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Album', {data: data.id})}>
        <Image
          style={styles.img} 
          source={{uri: data.coverImage}}/>
        <View style={[globalStyle.alignToColumn, styles.detailsContainer]}>
          <Text>{data.albumTitle}</Text>
          <Text>{data.imageCount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SingleAlbum

const styles = StyleSheet.create({
  container : {
    padding: 5
  },
  detailsContainer : {
    justifyContent: 'space-between'
  },
  img: {
      width: 150,
      height: 150
  }
})