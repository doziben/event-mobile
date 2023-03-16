import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Calendar,
  WeekCalendar,
  AgendaList,
  Agenda,
} from "react-native-calendars";
import CalendarHeader from "../../../components/calendar/CalendarHeader";
import { CalendarContext } from "../../../store/CalendarContext";

export default function WeekView() {
  //get dates that fall into this week and mark them

  const { date } = useContext(CalendarContext);
  return (
    <View style={styles.container}>
      <CalendarHeader date={date} />
      <Agenda
        items={{
          "2022-10-2": [{ name: "item 1 - any js object" }],
          "2022-10-3": [{ name: "item 2 - any js object", height: 80 }],
          "2022-10-4": [],
          "2022-10-5": [
            { name: "item 3 - any js object", day: new Date(), height: 20 },
            { name: "any js object" },
          ],
        }}
        theme={{
          selectedDotColor: "#000",
          dotColor: "#000",
          agendaDayNumColor: "#000",
          todayDotColor: "#000",
          todayBackgroundColor: "#000",
        }}
        loadItemsForMonth={(month) => {
          console.log(month);
        }}
        hideKnob={true}
        markedDates={{
          "2012-05-16": { selected: true, marked: true },
          "2012-05-17": { marked: true },
          "2012-05-18": { disabled: true },
        }}
        refreshing={false}
        renderItem={(item, firstItemInDay) => {
          console.log(item);

          return <View />;
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          console.log(day);

          return <View />;
        }}
      />
      {/* <WeekCalendar
        renderHeader={(date) => <CalendarHeader date={date} />}
        onDayPress={(day) => console.log(day)}
        firstDay={0}
        style={{ shadowOpacity: 0 }}
        contentContainerStyle={{ shadowOpacity: 0, backgroundColor: "black" }}
        calendarStyle={{
          padding: 0,
          shadowOpacity: 0,
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
