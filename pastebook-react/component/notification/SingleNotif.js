import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import { getNotificationById, notificationHasSeen } from './NotificationService'

import Loading from '../others/Loading'

const SingleNotif = ({navigation, item}) => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  
  useEffect(() => {
    const fetchData = async() => {
      await getNotificationById({id: item})
      .then(response => {
        setData(response.data)

        setLoading(false)
      })
      .catch(error => {
        console.log('ERROR: Single Notif, retrieving notification details')
        console.log(error)
      })
    }

    fetchData()
  }, [refresh])

  const seenNotification = async() => {
    await notificationHasSeen({id: item})
    .then(response => {
      setRefresh(!refresh)
    })
    .catch(error => {
      console.log('ERROR: Single Notif, Make notif seen')
      console.log(error)
    })
  }

  const clickNavigate = () => {

    seenNotification()

    if (data.navigateTo === 'album') {
      navigation.navigate('Album', { data: data.navigationId });
    } else if (data.navigateTo === 'post') {
      navigation.navigate('Post', { data: 'none', item: data.navigationId });
    } else if (data.navigateTo === 'user') {
      navigation.navigate('Profile', { id: data.navigationId });
    } else {
      console.log('There is something wrong');
      console.log('To: ' + data.navigateTo);
      console.log('Id: ' + data.navigationId);
    }

    setRefresh(!refresh)
  }

  return (
    <>
      {
        loading ? <Loading/> :
        <TouchableOpacity onPress={clickNavigate}>
          <View style={[globalStyle.alignToColumn, styles.container]}>
            <Image 
              source={{uri: data.userSent.profilePicture}}
              style={styles.img}
              />
              <View style={[styles.textContainer]}>
                  <View style={[styles.alignToColumn]}>
                      <Text style={styles.nameStyle}>{data.userSent.fullname}</Text>
                      <Text style={styles.timeStyle}>{data.dateCreated}</Text>
                  </View>
                  <Text>{data.content}</Text>
              </View>
          </View>
        </TouchableOpacity>
      }
    </>
  )
}

export default SingleNotif

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  img: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10
  },
  alignToColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  nameStyle: {
    fontWeight: '600',
    fontSize: 16
  },
  timeStyle: {
    fontWeight: '400',
    fontSize: 12
  }
})