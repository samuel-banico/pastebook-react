import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


const Header = ({navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Image 
          style={styles.logo} 
          source={require('../../assets/header-logo.png')}/>
        </TouchableOpacity>

        <View style={styles.iconsLogoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MaterialIcons name='search' size={25} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <MaterialIcons name='settings' size={25} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name='home' size={25} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FriendRequest')}>
            <MaterialIcons name='group-add' size={25} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <MaterialIcons name='notifications' size={25} style={styles.icon}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const press = () => {
  console.log('test');
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    padding: 5
  },
  logoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconsLogoContainer: {
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    marginLeft: 10,
  }
})

export default Header