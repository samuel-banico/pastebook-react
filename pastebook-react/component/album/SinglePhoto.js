import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAlbumImagePhotoById } from './AlbumService'

const SinglePhoto = ({navigation, item}) => {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await getAlbumImagePhotoById({id:item})
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('ERROR: Single Photo')
        console.log(error)
      })

      setLoading(false)
    } 

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Photo', {id: item})}>
          <Image
            style={styles.img} 
            source={{uri: data.image}}/>
        </TouchableOpacity>  
          
    </View>
  )
}

export default SinglePhoto

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    img: {
      width: 100,
      height: 100,
    }
})