import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

interface PaymentGatewayProps {
  type: string;
  image: ImageData;
}

export default function PaymentGateWay(props: PaymentGatewayProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FAFAFA",
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginVertical: 10,
      }}
    >
      <Text style={{ fontFamily: "OpenSansSemiBold", fontSize: 14 }}>
        {props.type}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={{ marginRight: 10 }} source={props.image} />
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </View>
    </View>
  );
}

// <View>
// <TouchableOpacity>
//   <PaymentGateWay
//     type="Bank Account"
//     image={require("../../../assets/app-media/bank.png")}
//   />
// </TouchableOpacity>
// <TouchableOpacity>
//   <PaymentGateWay
//     type="Stripe Account"
//     image={require("../../../assets/app-media/stripepng.png")}
//   />
// </TouchableOpacity>
// </View>
