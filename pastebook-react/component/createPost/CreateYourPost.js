import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

import { createPost } from './PostService';

import globalStyle from '../../assets/styles/globalStyle'

const CreateYourPost = ({data, navigation}) => {

  const [userData, setUserData] = useState({})
  const [friendData, setFriendData] = useState({})

  const [postData, setPostData] = useState({
    content: '',
    isPublic: true,
  })

  useEffect(() => {
    setUserData(data.user);
    setFriendData(data.friend)
  })

  const [shareOption, setShareOption] = useState(true)
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Post Created'
    });
  }

  const handlePostService = async(data) => {
    try {
      await createPost(data)
      .then(response => {
        showToast();
        navigation.navigate('Home')
      })
      .catch(error => {
        console.log(error.message)
        console.log(error.response.data)
      })
    } catch (error) {
      
    }
  }

  const postClick = () => {
    var friendId = null;
    if(friendData != null) 
      friendId = friendData.userId

    var data = {
      content : postData.content,
      isPublic : postData.isPublic,
      userId : userData.userId,
      friendId : friendId
    }

    handlePostService(data);
  }

  return (
    <ScrollView contentContainerStyle={[globalStyle.colorBackground, styles.container]}>
      <View style={[styles.alignToColumn, {alignItems: 'center'}]}>
        <Image 
            source={{uri: userData.profilePicture}}
            style={styles.img}
        />
        <View style={[{justifyContent: 'center', marginLeft: 5}]}>
          <Text multiline={true}>{userData.fullname}</Text>
          {
            friendData && <Text>To {friendData.fullname}</Text>
          }
        </View>
      </View>
      
      <View style={{flex: 1}}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder= "What's on your mind?"
          autoFocus={true}
          value={postData.content}
          onChangeText={(e) => {
            setPostData({
              ...postData,
              content: e
            })
          }}/>
      </View>
      
      <View style={[globalStyle.alignToColumn, styles.optionsContainer]}>
        <Picker
              style={[globalStyle.textInputBox, {width: 160}]}
              selectedValue={shareOption}
              onValueChange={(itemValue, itemIndex) => {
                setShareOption(itemValue)
                setPostData({
                  ...postData,
                  isPublic: itemValue
                })
              }}>
              <Picker.Item label="🌐 Public" value={true}/>
              <Picker.Item label="🫂 Friends" value={false} />
            </Picker>
        <TouchableOpacity style={[styles.button]} onPress={postClick}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingHorizontal: 10,
      flex: 1
    },
    optionsContainer: {
      alignItems: 'center', 
      justifyContent: 'space-between'
    },
    img: {
      height: 50,
      width: 50,
      borderRadius: 25
    },
    button: {

      marginRight: 25
    },
    alignToColumn: {
      flexDirection: 'row',
      alignItems: 'center'
  },

})

export default CreateYourPost