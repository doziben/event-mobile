import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BriefCase from "../../assets/svg-icons/briefcase";
import Star from "../../assets/svg-icons/star";
import User from "../../assets/svg-icons/user";
import useCountriesStates from "../../data/countriesStatesServer";
import useUser from "../../hooks/queries/useUser";
import LoadingComp from "../Interface/LoadingComp";
import RatingItem from "../Interface/RatingItem";
import UserImage from "../Interface/UserImage";
import UserPortfolio from "./UserPortfolio";
import UserPosts from "./userPosts";
import UserReviews from "./UserReviews";

export interface UserProfileProps {
  userId: string;
}

const Tab = createMaterialTopTabNavigator();

export default function UserProfile({ userId }: UserProfileProps) {
  const { data, isLoading } = useUser(userId);

  const { getCountry } = useCountriesStates();

  const userCountry = getCountry(null, data?.country);
  const userState =
    userCountry &&
    userCountry?.states?.find((s) => {
      return s?._id === data?.state;
    });

  const address = `${userState?.name}, ${userCountry?.name}`;

  return (
    <ScrollView style={styles.container}>
      {/* Top Section */}
      {isLoading ? (
        <LoadingComp />
      ) : (
        <View style={styles.top}>
          <UserImage imgSrc={data?.image} name={data?.firstName} size="lg" />

          <View style={{ marginTop: 10 }}>
            <Text
              style={styles.text}
            >{`${data?.firstName} ${data?.lastName}`}</Text>
            <Text style={styles.subText}>{address}</Text>
          </View>

          {/* Ratings */}
          <RatingItem value={data?.overallRating} />
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabs}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              width: 0,
            },
            tabBarActiveTintColor: "#DE8E0E",
            tabBarInactiveTintColor: "#9E9FA2",
            tabBarStyle: {
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: "#E5E5E5",
              backgroundColor: "#FAFAFA",
            },
          }}
        >
          <Tab.Screen
            name="userPosts"
            component={UserPosts}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => <User color={color} />,
            }}
            initialParams={{ userId }}
          />
          <Tab.Screen
            name="userReviews"
            component={UserReviews}
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => <Star color={color} />,
            }}
            initialParams={{ userId }}
          />
          {data?.userType === "vendor" && (
            <Tab.Screen
              name="userPortfolio"
              component={UserPortfolio}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ color }) => <BriefCase color={color} />,
              }}
              initialParams={{ userId }}
            />
          )}
        </Tab.Navigator>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  tabs: { height: 800, backgroundColor: "#fafafa" },
  bioText: {
    textAlign: "center",
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 16,
    lineHeight: 24,
  },
  top: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#fafafa",
    paddingVertical: 12,
  },
  text: {
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  subText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
