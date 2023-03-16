import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native";

import { WebView } from "react-native-webview";
import PressableIcon from "../../components/Interface/PressableIcon";

export default function StripeConnect({ navigation, route }) {
  const { uri } = route?.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <PressableIcon
        icon={<Feather size={24} name="arrow-left" />}
        onPress={navigation.goBack}
      /> */}
      <WebView source={{ uri }} originWhitelist={["*"]} />
    </SafeAreaView>
  );
}
