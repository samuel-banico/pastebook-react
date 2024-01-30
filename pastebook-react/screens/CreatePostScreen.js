import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native'

import CreateYourPost from '../component/createPost/CreateYourPost'

const CreatePostScreen = ({navigation}) => {
  const route = useRoute();
  const {data} = route.params;

  return (
    <View style={{flex: 1}}>
      <CreateYourPost data={data} navigation={navigation}/>
    </View>
  )
}

export default CreatePostScreen