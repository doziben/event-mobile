import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//sub components
import Items from './upgrade-components/Item';
import CurrentPlan from './upgrade-components/CurrentPlan';
import SelectButton from './upgrade-components/SelectButton';


export default function Elite() {
    const currentPlan = 'free';

    return(
        <View style={styles.container}>
            <View style={{paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderColor: '#E5E5E5'}}>
                <Text style={{fontSize: 16, fontFamily: 'MontserratBold', lineHeight: 24}}>Elite</Text>      
                <Text style={{color: '#DE8E0E', fontSize: 14, fontFamily: 'OpenSansRegular', lineHeight: 24}}>$799.99/Year (33.33%)</Text>
            </View>
            
            <View style={styles.planDetails}>
                <Text style={{fontSize: 14, fontFamily: 'OpenSansSemiBold', lineHeight: 24, marginBottom: 10}}>What's included:</Text>
                <ScrollView>
                    <Items text="Early bird request" />
                    <Items text="5% Commission" />
                    <Items text="Unlimited staff" />
                    <Items text="Unlimited Locations" />
                    <Items text="Ability to set your own prices and list services" />
                    <Items text="Professional reports" />
                    <Items text="High profile events" />
                    <Items text="Unlimited storage" />
                </ScrollView>
            </View>
            
            {/* curent type should be rendered conditionaly, you know what to do Denning */}
            <View style={styles.currentType}>
                {currentPlan === 'elite' ? <CurrentPlan /> : <SelectButton />}
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
    },

    myplan: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 100,
        backgroundColor: '#FAFAFA'
    },

    myplanText: {
        fontFamily: 'OpenSansBold',
        color: '#8C8C8C',
        fontSize: 14
    }

});