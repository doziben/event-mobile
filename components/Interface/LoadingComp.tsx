import { ActivityIndicator, View } from "react-native";

interface LoadingCompProps {}

export default function LoadingComp({}: LoadingCompProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color="#DE8E0E" />
    </View>
  );
}
