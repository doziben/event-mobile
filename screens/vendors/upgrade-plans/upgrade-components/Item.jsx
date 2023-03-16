import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Items(props) {
    return(
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <Ionicons style={{marginRight: 10}} name="checkmark-circle-outline" color="#3E9F4D" size={24} />
            <Text style={{fontSize: 14, fontFamily: 'OpenSansRegular'}}>{props.text}</Text>
        </View>
    );
}