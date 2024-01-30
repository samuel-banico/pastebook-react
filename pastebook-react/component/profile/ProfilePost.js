import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import Post from '../../component/home/Post'
import SinglePost from '../../component/home/SinglePost'

import { getOwnProfilePost } from './ProfileService'

const ProfilePost = ({navigation, userId}) => {

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async() => {

      await getOwnProfilePost({id: userId})
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log('ERROR: Profile Post')
        console.log(error.response.data)
      })
    }

    fetchData()
  }, [])

  return (
    <View style={[styles.container]}>
        <Post navigation={navigation} enableProfileTransfer={false} userId={userId}/>
        <View style={{flex: 1}}>
          {
            data.length > 0 ? data.map((item) => (
              <SinglePost key={item} navigation={navigation} item={item}/>
            )) : 
            <View>
              <Text>No Post</Text>
            </View>
          }
        </View>
    </View>
  )
}

export default ProfilePost

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})