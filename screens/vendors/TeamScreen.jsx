import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DrawerHeader from '../../components/DrawerHeader';

export default function MyTeam({navigation}) {
    return(
        <View style={{flex: 1}}>
            <DrawerHeader onPressed={() => navigation.openDrawer()} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    }
})