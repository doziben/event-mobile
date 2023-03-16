import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  DateTimePickerEvent,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import getTimeString from "../../utils/GetTimeString";
import TextButton from "./TextButton";

interface DatePickerProps {
  dateValue: Date;
  timeValue: Date;
  onChangeDate?: (event: DateTimePickerEvent, selectedDate: Date) => void;
  onChangeTime?: (event: DateTimePickerEvent, selectedTime: Date) => void;
  minDate?: Date;
}

export default function DatePicker({
  dateValue,
  onChangeDate,
  onChangeTime,
  timeValue,
  minDate,
}: DatePickerProps) {
  const [isSelecting, setIsSelecting] = useState<"date" | "time" | "none">(
    "none"
  );
  const datePlaceholder = dateValue.toLocaleDateString();
  const timePlaceholder = getTimeString({ date: timeValue });

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: currentMode === "date" ? dateValue : timeValue,
      onChange: currentMode === "date" ? onChangeDate : onChangeTime,
      mode: currentMode,
      is24Hour: true,
      minimumDate: currentMode === "date" ? minDate ?? new Date() : undefined,
    });
  };

  let comp = <></>;

  switch (isSelecting) {
    case "date":
      comp = (
        <RNDateTimePicker
          display="spinner"
          value={dateValue}
          minimumDate={minDate ?? new Date()}
          mode={"date"}
          onChange={onChangeDate}
        />
      );
      break;

    case "time":
      comp = (
        <RNDateTimePicker
          value={timeValue}
          mode={"time"}
          is24Hour={false}
          onChange={onChangeTime}
          display="spinner"
        />
      );
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Date */}
        <View style={styles.date}>
          <Text style={styles.label}>Select date</Text>
          <TouchableOpacity
            onPress={() => {
              Platform.OS === "android"
                ? showMode("date")
                : setIsSelecting("date");
            }}
            style={[styles.wrapper]}
          >
            <Text style={styles.text}>{datePlaceholder}</Text>
          </TouchableOpacity>
        </View>

        {/* Time */}
        <View style={styles.date}>
          <Text style={styles.label}>Select Time</Text>
          <TouchableOpacity
            onPress={() => {
              Platform.OS === "android"
                ? showMode("time")
                : setIsSelecting("time");
            }}
            style={[styles.wrapper]}
          >
            <Text style={styles.text}>{timePlaceholder}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      {isSelecting !== "none" && (
        <View style={styles.save}>
          <TextButton title="Save" onPress={() => setIsSelecting("none")} />
        </View>
      )}
      {comp}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    color: "#767676",
  },
  form: { flexDirection: "row", justifyContent: "space-between" },
  date: {
    width: "48%",
  },
  save: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
