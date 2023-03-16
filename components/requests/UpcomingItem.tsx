import { View, Text } from "react-native";

interface UpcomingItemProps {}

export default function UpcomingItem({}: UpcomingItemProps) {}

function Item() {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#EBEBEB",
      }}
    >
      <View
        style={{
          backgroundColor: "#212121",
          width: 32,
          height: 32,
          borderRadius: 32,
          marginRight: 10,
          marginTop: 5,
        }}
      ></View>
      <View style={{ flex: 2 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text
              style={{
                fontFamily: "OpenSansSemiBold",
                fontSize: 14,
                lineHeight: 24,
              }}
            >
              Bass Guitarist
            </Text>
            <Text
              style={{
                fontFamily: "OpenSansRegular",
                fontSize: 10,
                color: "#767676",
                lineHeight: 24,
              }}
            >
              VICTOR SMITH
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "OpenSansRegular",
              fontSize: 12,
              color: "#767676",
              lineHeight: 24,
            }}
          >
            1d
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontFamily: "OpenSansRegular",
              fontSize: 12,
              color: "#DE8E0E",
              lineHeight: 18,
            }}
          >
            Pending Approval
          </Text>
          <Text
            style={{
              fontFamily: "OpenSansRegular",
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            $12/hr
          </Text>
        </View>
      </View>
    </View>
  );
}
