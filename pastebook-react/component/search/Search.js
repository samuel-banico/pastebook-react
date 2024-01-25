import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'
import SingleSearch from './SingleSearch'
import { getTokenData } from '../others/LocalStorage'
import { searchUser } from './SearchService'

const Search = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('')

  const [searchUserList, setSearchUserList] = useState([])

  useEffect(() => {
    
  }, [searchUserList])

  const onSearch = async (value) => {
    var token = await getTokenData();

    const search = {
      username: value
    }

    return await searchUser(token, search)
    .then(response => {
      setSearchUserList(response.data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
      <View style={[styles.roundedContainer]}>
        <TextInput 
          autoFocus={true} 
          placeholder='Search...'
          value={searchValue}
          onChangeText={(e) => {
            setSearchValue(e)
            onSearch(e)
          }}/>
      </View>
      <HR/>
      <ScrollView>
        {
          searchUserList.length > 0 && searchUserList.map((item) => (
            <SingleSearch key={item.userId} item={item} navigation={navigation}/>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1
  },
  roundedContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 5
  }
})

export default Search