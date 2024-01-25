import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Login from '../component/registration/Login';

import LoadingScreen from './LoadingScreen';

import Modal from 'react-native-modal'

import Loading from '../component/others/Loading';

const LoginScreen = ({navigation}) => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)

  const disableLoadingScreen = (value) => {
    setShowLoadingScreen(value);
  }

  const [isLoading, setIsLoading] = useState(false);

  const showLoading = (value) => {
    setIsLoading(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        showLoadingScreen ? <LoadingScreen/> : 
        <View>
          <Login navigation={navigation} fetchData={showLoading} disableLoading={disableLoadingScreen}/>
          <Modal isVisible={isLoading}>
            <Loading />
          </Modal>
        </View>
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