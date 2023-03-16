import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { View, StyleSheet, Text, GestureResponderEvent } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ServiceCartContext } from "../../store/ServiceCartContext";
import PressableIcon from "../Interface/PressableIcon";
import TextButton from "../Interface/TextButton";

interface CartBarProps {
  onProceed: (e: GestureResponderEvent) => void;
}
export default function CartBar({ onProceed }: CartBarProps) {
  const navigation = useNavigation();
  const cartCtx = useContext(ServiceCartContext);
  const services = cartCtx?.services;

  return services.length > 0 ? (
    <View style={styles.container}>
      {/* Services List */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={services}
        keyExtractor={(item, _) => _.toString()}
        renderItem={({ item }) => (
          <View style={styles.service}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

      {/* Right End */}
      <View style={styles.rightEnd}>
        <TextButton title="Add +" onPress={() => navigation.navigate("Home")} />
        <View style={styles.button}>
          <PressableIcon
            onPress={onProceed}
            icon={<Feather name="arrow-right" size={24} color="#fff" />}
          />
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  service: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#E5E5E5",
  },
  button: {
    backgroundColor: "#DE8E0E",
    padding: 2,
    borderRadius: 4,
    marginLeft: 12,
  },
  rightEnd: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
