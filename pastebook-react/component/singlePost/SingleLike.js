import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Loading from '../others/Loading'
import { getUserByPostLikeId } from './SinglePostService'
import globalStyle from '../../assets/styles/globalStyle'

const SingleLike = ({navigation, item}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      await getUserByPostLikeId({id:item})
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR: Single Like, retrieval of use data from post like id')
        console.log(error)
      })
    }

    fetchData()
  }, [])
  return (
    <>
      {
        loading ? <Loading/> :
        <View style={[styles.likeContainer]}>
          <TouchableOpacity style={globalStyle.alignToColumn} onPress={() => navigation.navigate('Profile', {id:data.userId})}>
            <Image style={styles.img} 
              source={{uri: data.profilePicture}}/>
            <Text>{data.fullname}</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}

export default SingleLike

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5
  },
  likeContainer: {
    marginTop: 8,
  }
})