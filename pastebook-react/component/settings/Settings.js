import { Button, SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'

import Collapsible from 'react-native-collapsible';

import Logout from './Logout'
import Security from './Security'
import YourProfile from './YourProfile'
import HR from '../others/HR'

import globalStyle from '../../assets/styles/globalStyle'

import { getTokenData } from '../others/LocalStorage';

import { settingsGetUserData, toggleViewPublic } from './SettingsService';

const Settings = ({navigation}) => {

    const [data, setData] = useState({})
    const [isEnabled, setIsEnabled] = useState({
        viewPublic: { state: null},
        darkMode: {state: false}
    });
    const [isCollapsed, setIsCollapsed] = useState(true);

    //initialize data
    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData();

            await settingsGetUserData(token)
            .then(response => {
                setData(response.data)
                toggleSwitch('viewPublic', response.data.viewPublicPost)
            })
            .catch(error => {
                console.log(error)
            })
        }

        fetchData();
    }, [isEnabled.viewPublic])

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    const toggleSwitch = (fieldName, value) => {
        setIsEnabled({
            ...isEnabled,
            [fieldName]: {
                state: value
            }
        });
    }

    const handleViewPublic = async(value) => {
        var token = await getTokenData();

        await toggleViewPublic(token, {viewPublic: value})
        .then(response => {
            
        })
        .catch(error => {
            console.log(error)
        })

        toggleSwitch('viewPublic', value)
    }

    return (
        <SafeAreaView style={[globalStyle.colorBackground, styles.container]}>
            <View>
                <View>
                    <YourProfile navigation={navigation} data={data}/>
                </View>
                <Button title='click' onPress={toggleCollapse}/>
                
                <Collapsible collapsed={isCollapsed} enablePointerEvents={true}>
                    <View style={[globalStyle.alignToColumn, styles.switchContainer]}>
                        <Text>View Public Posts</Text>
                        <Switch 
                            trackColor={{false: '#767577', true: '#67233e'}}
                            thumbColor={isEnabled.viewPublic.state ? '#67233e' : '#7ed3bb'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(e) => handleViewPublic(e)}
                            value={isEnabled.viewPublic.state}/>
                    </View>
                    <View style={[globalStyle.alignToColumn, styles.switchContainer]}>
                        <Text>Dark Mode</Text>
                        <Switch 
                            trackColor={{false: '#ffffff', true: '#000000'}}
                            thumbColor={isEnabled.darkMode.state ? '#000000' : '#ffffff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch('darkMode')}
                            value={isEnabled.darkMode.state}/>
                    </View>
                </Collapsible>
                <HR/>
                <Security navigation={navigation}/>
                <Logout navigation={navigation}/>
            </View>
        </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }, 
    switchContainer: {
        justifyContent: 'space-between',
        marginHorizontal: 50
    }
})