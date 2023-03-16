import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PressableIcon from "./PressableIcon";

interface RatingItemProps {
  value: string | null | number;
}

interface RateProps {
  onRate: (value: number) => void;
}

export default function RatingItem({ value }: RatingItemProps) {
  const parsedValue =
    typeof value === "string" ? parseInt(value ?? "0") : value ?? 0;
  const rated = parsedValue > 5 ? 5 : parsedValue;
  const total = 5;
  const missed = total - rated;

  const missedArr = [];
  const ratedArr = [];

  for (let i = 0; i <= missed - 1; i++) {
    missedArr.push(i);
  }

  for (let i = 0; i <= rated - 1; i++) {
    ratedArr.push(i);
  }

  return (
    <View style={styles.container}>
      {ratedArr.map((val) => (
        <Ionicons key={val} name="star-sharp" size={20} color="#DE8E0E" />
      ))}
      {missedArr.map((val) => (
        <Ionicons key={val} name="star-sharp" size={20} color="#C6C6C6" />
      ))}
    </View>
  );
}

function Rate({ onRate }: RateProps) {
  const stars = [1, 2, 3, 4, 5];
  const [selected, setSelected] = useState<number>(0);

  useEffect(() => {
    onRate(selected);
  }, [selected]);

  return (
    <View
      style={[
        styles.container,
        { justifyContent: "space-between", marginVertical: 12 },
      ]}
    >
      {stars.map((n) => {
        let isSelected = selected >= n;
        return (
          <PressableIcon
            key={n}
            icon={
              <Ionicons
                name="star-sharp"
                size={40}
                color={isSelected ? "#DE8E0E" : "#C6C6C6"}
              />
            }
            onPress={() => setSelected(n)}
          />
        );
      })}
    </View>
  );
}

RatingItem.Rate = Rate;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
