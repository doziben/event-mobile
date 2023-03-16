import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function AllEvents() {
    return(
        <View style={styles.container}>
            <View style={styles.tHead}>
                <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: 14}}>Name</Text>
                <Text style={{fontFamily: 'OpenSansSemiBold', fontSize: 14}}>Date</Text>
            </View>
            <View>
                <EventItem title="2021 Concert: Live jam" date="09 Oct" />
                <EventItem title="Wedding" date="09 Oct" />
                <EventItem title="2021 Concert: Live jam" date="09 Oct" />
            </View>
        </View>
    );
}

function EventItem(props) {
    return(
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderColor: '#E5E5E5'}}>
            <View style={{flexDirection: 'row'}}>
                {/*check box*/}
                <View style={{width: 15, height: 15, borderWidth: 1, marginRight: 10, borderColor: '#767676', borderRadius: 4}}></View>
                {/*image*/}
                <View style={{width: 48, height: 27, backgroundColor: '#212121', borderRadius: 4, marginRight: 10}}></View>
                <Text style={{fontFamily: 'OpenSansSemiBold', color: '#767676'}}>{props.title}</Text>
            </View>
            <Text style={{fontFamily: 'OpenSansSemiBold', color: '#767676'}}>{props.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    tHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5'
    }
});