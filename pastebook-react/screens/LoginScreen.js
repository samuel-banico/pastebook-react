import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Login from '../component/registration/Login';

import LoadingScreen from './LoadingScreen';


const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true); 

    setTimeout(() => {
      navigation.navigate('Home');

      setIsLoading(false); 
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading ? <LoadingScreen/> : (
          <Login navigation={navigation} fetchData={fetchData}/>
        )
      }
    </SafeAreaView>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})