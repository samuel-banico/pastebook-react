import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserByPostCommentId } from './SinglePostService';

import Loading from '../others/Loading';
import HR from '../others/HR';
import globalStyle from '../../assets/styles/globalStyle';

const SingleComment = ({navigation, item}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      await getUserByPostCommentId({id:item})
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
        <View style={[styles.likeContainer, globalStyle.alignToColumn]}>
            <View style={[styles.borderContainer, globalStyle.colorBoxBG]}>
              <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                <TouchableOpacity style={[globalStyle.alignToColumn]} onPress={() => navigation.navigate('Profile', {id:data.user.userId})}>
                  <Image style={styles.img} 
                    source={{uri: data.user.profilePicture}}/>
                  <Text>{data.user.fullname}</Text>
                </TouchableOpacity>
                <Text style={globalStyle.textParagraph}>{data.createdOn}</Text>
              </View>
              <HR/>
              <Text numberOfLines={2}>{data.comment}</Text>
            </View>
        </View>
      }
    </>
  )
}

export default SingleComment

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5
  },
  likeContainer: {
    marginTop: 8,
  },
  borderContainer: {
    borderRadius: 50,
    flex:1,
    padding: 10
  }
})