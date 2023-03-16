import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import CalendarHeader from "../../../components/calendar/CalendarHeader";
import CalendarEventModal from "../../../components/modals/CalendarEventModal";
import useCalendar from "../../../hooks/queries/useCalendar";
import useUser from "../../../hooks/queries/useUser";
import { CalendarObj } from "../../../types/api/calendarDataObj";

interface MonthView {
  current: Date;
}

type dayObject = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export default function MonthView({ current }: MonthView) {
  const { data: userData } = useUser();
  const { data, isLoading } = useCalendar();

  const dataIsValid = Array.isArray(data);

  const initialDate = {
    date: new Date().toISOString(),
    description: "",
    endTime: new Date().getTime(),
    eventname: "",
    isTimed: true,
    location: "",
    startTime: new Date().getTime(),
    user: userData?._id,
    _id: "",
  };

  const [isViewing, setIsViewing] = useState<CalendarObj>(initialDate);

  const hasDate = isViewing?.eventname > "";

  function closeEventModal() {
    setIsViewing(initialDate);
  }

  let markedDay = {};

  const initialArr = [
    {
      date: new Date().toISOString().slice(0, 10),
    },
  ];

  const [markedDates, setMarkedDates] = useState(initialArr);

  //** Getting dates from servver on render */
  useEffect(() => {
    if (dataIsValid) {
      setMarkedDates((p) => [...p, ...data]);
    }
  }, [dataIsValid]);

  markedDates.map(({ date }) => {
    markedDay[date] = {
      selected: true,
      color: "#DE8E0E",
      startingDay: true,
      endingDay: true,
    };
  });

  function showDate(day: dayObject) {
    const { dateString } = day;

    const hasEvent =
      dataIsValid &&
      data?.find(
        ({ date }) =>
          new Date(date).toDateString() === new Date(dateString).toDateString()
      );

    if (!hasEvent) {
      return;
    }

    setIsViewing(hasEvent);
  }

  return (
    <>
      {/* Modal for events */}
      <CalendarEventModal
        {...isViewing}
        isVisible={hasDate}
        onClose={closeEventModal}
      />

      {/* Main Month View */}
      <View>
        <Calendar
          markingType={"period"}
          markedDates={markedDay}
          // calendarWidth={Dimensions.get("screen").width}
          // calendarHeight={Dimensions.get("screen").height}
          // calendarStyle={{ padding: 0, backgroundColor: "#fff" }}
          current={current.toISOString()}
          onDayPress={(day) => {
            showDate(day);
          }}
          monthFormat={"yyyy MM"}
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          hideArrows={true}
          hideExtraDays={false}
          disableMonthChange={true}
          firstDay={0}
          hideDayNames={false}
          showWeekNumbers={false}
          disableArrowLeft={true}
          disableArrowRight={true}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={(date) => {
            return <CalendarHeader date={date} />;
          }}
          enableSwipeMonths={false}
          // horizontal={false}
          // pagingEnabled={false}
          // dayComponent={({ date, state }) => {
          //   return (
          //     <View style={styles.daysBox}>
          //       <Text
          //         style={{
          //           color: state === "disabled" ? "#DBDBDB" : "#767676",
          //           fontFamily: "OpenSansRegular",
          //           fontSize: 14,
          //           textAlign: "center",
          //         }}
          //       >
          //         {date.day}
          //       </Text>
          //     </View>
          //   );
          // }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  dateContainer: {
    borderRadius: 200,
  },
  weekDays: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },

  weekDaysBox: {
    borderRightWidth: 1,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    height: 50,
    justifyContent: "center",
    flex: 1,
  },

  daysBox: {
    borderRightWidth: 1,
    //borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
    width: 58.7,
    height: 50,
    paddingTop: 10,
  },
});
