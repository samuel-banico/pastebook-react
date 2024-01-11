import { View, Text, SafeAreaView, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/*  */}
      <Text>Login</Text>

      <SafeAreaView>
          <View style={styles.AlignToColumn}>
              <Text>Email: </Text>
              <TextInput defaultValue='email'/>
          </View>
          <View style={styles.AlignToColumn}>
              <Text>Password: </Text>
              <TextInput defaultValue='password'/>
          </View>
      </SafeAreaView>
      
      <SafeAreaView>
        <Button title='Login' onPress={() => navigation.navigate('Welcome')}/>
      </SafeAreaView>

    </SafeAreaView>
  )
}

export default Login


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    AlignToColumn: {
        flexDirection: 'row',
        alignItems: 'center'
    },
  }
)