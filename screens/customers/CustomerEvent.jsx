import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DrawerHeader from '../../components/DrawerHeader';
import AlertModal from '../../components/AlertModal';

//sub screens
import AllEvents from './event-sub/AllEvents';


const Tab = createMaterialTopTabNavigator();


export default function CustomerEvent({navigation}) {
    return(
        <View style={styles.container}>
            <DrawerHeader onPressed={() => navigation.openDrawer()} />
            <View style={styles.requestHeader}>
                <Text style={{fontSize: 24, fontFamily: 'MontserratBold', lineHeight: 48}}>Events</Text>
                <TouchableOpacity style={styles.createButton}>
                    <Ionicons name='add-sharp' size={24} color='#fff' />
                </TouchableOpacity>
            </View>

            <View style={styles.search}>
                <Ionicons style={{marginRight: 10}} name='search-outline' size={24} color='grey' />
                <TextInput style={{flex: 1}} placeholder='Search for events' />
            </View>

            <View style={{flex: 1}}>
                <Tab.Navigator screenOptions={{
                    tabBarIndicatorStyle: {
                        backgroundColor: '#DE8E0E',
                        //width: 57,
                        // left: 50
                    },
                    tabBarStyle: {
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderColor: '#E5E5E5',
                        backgroundColor: '#FAFAFA',
                    },
                    tabBarLabelStyle: {
                        textTransform:'none',
                        fontFamily: 'OpenSansSemiBold',
                        fontSize: 14,
                        lineHeight: 24,
                    }
                }}>
                    <Tab.Screen name="All" component={AllEvents} />
                    <Tab.Screen name="Published" component={AllEvents} />
                    <Tab.Screen name="Drafts" component={AllEvents} />
                    <Tab.Screen name="Past" component={AllEvents} />
                </Tab.Navigator>
            </View>
        </View>
    );
}

function Sub() {
    return(
        <View style={{flex: 1,backgroundColor: '#fff'}}>
            <Text>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },

    requestHeader: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },

    createButton: {
        padding: 10,
        backgroundColor: '#DE8E0E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    search: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10
    }

});