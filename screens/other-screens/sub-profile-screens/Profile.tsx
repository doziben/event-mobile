import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//screens
import MyProfile from "./sub-sub-profile/MyProfile";
import Portfolio from "./sub-sub-profile/Portfolio";
import Feeds from "./sub-sub-profile/Feeds";
import Ratings from "./sub-sub-profile/Ratings";
import Services from "./sub-sub-profile/Services";

//svg icons
import BriefCase from "../../../assets/svg-icons/briefcase";
import User from "../../../assets/svg-icons/user";
import Flash from "../../../assets/svg-icons/flash";
import Star from "../../../assets/svg-icons/star";
import StorePlus from "../../../assets/svg-icons/storeplus";
import HeadingText from "../../../components/Interface/HeadingText";
import UserAvatar from "../../../components/Interface/UserAvatar";
import useUser from "../../../hooks/queries/useUser";
import BioManager from "../../../components/account/biomanager";
import RatingItem from "../../../components/Interface/RatingItem";
import LoadingComp from "../../../components/Interface/LoadingComp";
import LocationManager from "../../../utils/LocationManager";
import useCountriesStates from "../../../data/countriesStatesServer";
import useVendorServices from "../../../hooks/queries/useVendorServices";
import useAllServices from "../../../hooks/queries/useAllServices";
import PremiumModal from "../../../components/modals/PremiumModal";

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
  const { data, isLoading } = useUser();
  const { data: countries, getCountry } = useCountriesStates();
  const { services } = useVendorServices();
  const { data: allServices } = useAllServices();

  const userCountry = getCountry(null, data?.country);
  const userState =
    userCountry &&
    userCountry?.states?.find((s) => {
      return s?._id === data?.state;
    });

  const name = `${data?.firstName} ${data?.lastName}`;
  const address = `${userState?.name}, ${userCountry?.name}`;
  const rating = data?.overallRating;

  return (
    <>
      {/* <LocationManager /> */}

      <ScrollView stickyHeaderIndices={[1]} style={styles.container}>
        <View style={styles.subContainerOne}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          >
            <HeadingText lg>Profile</HeadingText>
            {/* <Ionicons name="ellipsis-vertical-sharp" size={20} color="#1a1a1a" /> */}
          </View>
          {isLoading ? (
            <LoadingComp />
          ) : (
            <>
              <View style={{ alignItems: "center" }}>
                <View>
                  <UserAvatar />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={styles.text}>{name}</Text>
                  {services && allServices && (
                    <Text style={styles.subText}>
                      {
                        allServices?.find(
                          (s) => s?._id === services[0]?.category._id
                        )?.name
                      }
                    </Text>
                  )}
                  {userState && <Text style={styles.subText}>{address}</Text>}
                </View>

                <RatingItem value={rating} />
              </View>

              <View style={styles.bio}>
                <BioManager />
              </View>
            </>
          )}
        </View>

        <View style={{ height: 600, backgroundColor: "#fff" }}>
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
              tabBarLabel: () => null,
            }}
          >
            <Tab.Screen
              name="MyProfile"
              component={MyProfile}
              options={{
                tabBarIcon: ({ color }) => <User color={color} />,
              }}
            />
            <Tab.Screen
              name="Portfolio"
              component={Portfolio}
              options={{
                tabBarIcon: ({ color }) => <BriefCase color={color} />,
              }}
            />
            {/* <Tab.Screen
            name="Feeds"
            component={Feeds}
            options={{
              tabBarIcon: ({ color }) => <Flash color={color} />,
            }}
          /> */}
            <Tab.Screen
              name="Ratings"
              component={Ratings}
              options={{
                tabBarIcon: ({ color }) => <Star color={color} />,
              }}
            />
            <Tab.Screen
              name="Services"
              component={Services}
              options={{
                tabBarIcon: ({ color }) => <StorePlus color={color} />,
              }}
            />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  subContainerOne: {
    paddingHorizontal: 20,
  },
  subContainerTwo: {
    flex: 1,
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "grey",
    position: "absolute",
    top: 55,
    alignSelf: "center",
  },

  banner: {
    height: 100,
    width: 365,
    backgroundColor: "#212121",
    borderRadius: 5,
  },

  ratings: {
    marginTop: 5,
    flexDirection: "row",
  },

  bio: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
