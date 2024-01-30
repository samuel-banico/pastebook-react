import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleLike from './SingleLike'
import { getAllLikesIdInPost } from './SinglePostService'

import Loading from '../others/Loading'

const AllLikes = ({navigation, postId}) => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      await getAllLikesIdInPost({id: postId})
      .then(response => {
        setData(response.data)
        setLoading(false);
      })
      .catch(error => {
        console.log('ERROR: All Likes, retrieving of All Likes Id');
        console.log(error)
      })
    }

    fetchData()
  }, [])
  
  return (
    <>
      {
        loading ? <Loading/> :
        <View style={[styles.container, globalStyle.colorBackground]}>
          <ScrollView>
            <Text style={[globalStyle.textTitle]}>❤️ People who reacted</Text>
            {
              (data != null && data.length > 0) ?
              data.map((item) => (
                <SingleLike key={item} item={item} navigation={navigation} />
              )) :
              <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                  No Like/s 😔
                </Text>
              </View>
            }
          </ScrollView>
        </View>
      }
    </>
  )
}

export default AllLikes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})