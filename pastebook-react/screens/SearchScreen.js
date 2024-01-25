import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

import Search from '../component/search/Search'

const SearchScreen = ({navigation}) => {
  return (
    <Search navigation={navigation}/>
  ) 
}

export default SearchScreen