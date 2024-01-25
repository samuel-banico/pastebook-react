import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native'

import CreateYourPost from '../component/createPost/CreateYourPost'

const CreatePostScreen = ({navigation}) => {
  const route = useRoute();

  const [userData, setUserData] = useState({
    user: {},
    friend: {}
  })

  useEffect(() => {
    const {data} = route.params;

    setUserData ({
      user: data.user,
      friend: data.friend
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      <CreateYourPost data={userData} navigation={navigation}/>
    </View>
  )
}

export default CreatePostScreen