import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import globalStyle from '../../assets/styles/globalStyle'

import Loading from '../others/Loading'
import SingleComment from './SingleComment'
import { getAllCommentsIdInPost } from './SinglePostService'

const AllComments = ({navigation, postId, refresh}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      await getAllCommentsIdInPost({id: postId})
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR: All Comments, retreiving posts comment ids')
        console.log(error)
      })
    }

    fetchData()
  }, [refresh])

  return (
    <>
      {
        loading ? <Loading/> :
        <View style={[styles.container, globalStyle.colorBackground]}>
          <ScrollView>
            <Text style={globalStyle.textTitle}>All Comments</Text>
            {
              (data != null && data.length > 0) ?
              data.map((item) => (
                <SingleComment key={item} item={item} navigation={navigation}/>
              )) :
              <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                  No Comment/s 😔
                </Text>
              </View>
            }
          </ScrollView>
        </View>
      }
    </>
  )
}

export default AllComments

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})