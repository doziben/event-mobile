import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';



//sub components

import MonthDropDown from './MonthDropDown';
import DisplayTypeDropDown from './DisplayTypeDropDown';

export default function CalendarHeader() {

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    //state of calendar
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [showDrop, setShowDrop] = useState('none');
    const [showDrop2, setShowDrop2] = useState('none');
    const [monthText, setMonthText] = useState(months[now.getMonth()] + " " + now.getFullYear());
    const [displayType, setDisplayType] = useState("Month");
    
   
    //show and unshow dropdown
    function showMonthList() {
        if (showDrop === 'none') {
            setShowDrop('flex');
        } else if (showDrop === 'flex') {
            setShowDrop('none');
        }
    }

    //show and unshow drop
    function showDisplayTypeList() {
        if (showDrop2 === 'none') {
            setShowDrop2('flex');
        } else if (showDrop2 === 'flex') {
            setShowDrop2('none');
        }
    }

    //set month days display
    function setMonthNow(value) {
        setMonth(value);
        setMonthText(months[value] + " " + now.getFullYear());
        setShowDrop('none');
        console.log(value);
    }

    //dispay type 
    function setDisplayTypeNow(value) {
        setDisplayType(value);
        setShowDrop2('none');
    }

    //close drops when container is clicked
    function closeAllDrops() {
        setShowDrop2('none');
        setShowDrop('none');
    }

    return(

            <View style={styles.filter}>
                <DisplayType text={monthText} onPress={showMonthList} />
                <DisplayType text={displayType} onPress={showDisplayTypeList} />

                <MonthDropDown 
                    months={months}
                    onshow={showDrop}
                    onPress={(value) => setMonthNow(value)}
                />

                <DisplayTypeDropDown 
                    onshow={showDrop2}
                    onPress={(value) => setDisplayTypeNow(value)}
                />
            </View>
            
    )
}

function DisplayType(props) {
    return(
        <TouchableOpacity style={styles.displayType} onPress={props.onPress}>
            <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: 16}}>{props.text}</Text>
            <Ionicons name='chevron-down-outline' size={20} color='#DE8E0E' />
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },

    calenderHeader: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5'
    },

    createButton: {
        padding: 10,
        backgroundColor: '#DE8E0E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    displayType: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    filter: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FAFAFA'
    },

    calenderData: {
        flex: 1,
        backgroundColor: '#fff'
    },
})