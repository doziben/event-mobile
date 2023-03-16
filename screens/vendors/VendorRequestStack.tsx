import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerHeader from "../../components/DrawerHeader";
import PremiumModal from "../../components/modals/PremiumModal";
import { VendorRequestStackNav } from "../../types/extras/VendorRequestStackNav";
import ClientProfile from "./ClientProfile";
import RequestScreen from "./RequestScreen";

const NavStack = createNativeStackNavigator<VendorRequestStackNav>();

export default function VendorRequestStack({ navigation }) {
  return (
    <>
      <DrawerHeader onPressed={() => navigation.openDrawer()} />
      <PremiumModal onUpgrade={() => navigation.navigate("Upgrade")} />

      <NavStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <NavStack.Screen name="vendorRequests" component={RequestScreen} />
        <NavStack.Screen name="clientProfile" component={ClientProfile} />
      </NavStack.Navigator>
    </>
  );
}
