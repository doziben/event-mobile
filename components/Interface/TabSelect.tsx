import { useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TabSelectOption {
  name: string;
  onPress: (e: GestureResponderEvent) => void;
  isSelected?: boolean;
}

interface TabSelectProps {
  label: string;
  options: TabSelectOption[];
}

export default function TabSelect({ options, label }: TabSelectProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const width = `${100 / options.length}%`;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {options.map(
          ({ name, onPress, isSelected: alreadySelected }, index) => {
            const isSelected = selectedIndex == index || alreadySelected;
            return (
              <TouchableOpacity
                key={name}
                style={[
                  styles.option,
                  { width },
                  isSelected && styles.selectedOption,
                ]}
                onPress={(e) => {
                  setSelectedIndex(index);
                  onPress(e);
                }}
              >
                <Text style={[styles.text, isSelected && styles.selected]}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  text: {
    fontFamily: "OpenSansSemiBold",
    color: "#767676",
  },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D2D2D2",
    backgroundColor: "#FAFAFA",
  },
  option: {
    padding: 14,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
  },
  selected: {
    color: "#DE8E0E",
    fontWeight: "500",
  },

  selectedOption: {
    backgroundColor: "#FAF1E3",
  },
});
