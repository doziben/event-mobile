import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

//sub components
import Items from './upgrade-components/Item';
import CurrentPlan from './upgrade-components/CurrentPlan';
import SelectButton from './upgrade-components/SelectButton';

export default function Freemium() {

    const currentPlan = 'free';

    return(
        <View style={styles.container}>
            <View style={{paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontSize: 16, fontFamily: 'MontserratBold', lineHeight: 24}}>Freemium</Text>      
                <Text style={{color: '#DE8E0E', fontSize: 14, fontFamily: 'OpenSansRegular', lineHeight: 24}}>$0/Month</Text>
            </View>
            
            <View style={styles.planDetails}>
                <Text style={{fontSize: 14, fontFamily: 'OpenSansSemiBold', lineHeight: 24, marginBottom: 10}}>What's included:</Text>
                <ScrollView>
                    <Items text="25% Commission" />
                    <Items text="No staff" />
                    <Items text="One Location at a time" />
                    <Items text="One Service type" />
                </ScrollView>
            </View>
            
            {/* curent type should be rendered conditionaly, you know what to do Denning */}
            <View style={styles.currentType}>
                {currentPlan === 'free' ? <CurrentPlan /> : <SelectButton />}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
    },

    planDetails: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },

    currentType: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#E5E5E5'
    }
});