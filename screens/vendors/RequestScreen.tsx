import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AlertModal from "../../components/AlertModal";
import Modal from "react-native-modal";
import PendingScreen from "./request-sub-screens/PendingScreen";
import ActiveScreen from "./request-sub-screens/ActiveScreen";
import PastScreen from "./request-sub-screens/PastScreen";
import HeadingText from "../../components/Interface/HeadingText";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VendorRequestStackNav } from "../../types/extras/VendorRequestStackNav";
import ModalWrapper from "../../components/modals/ModalWrapper";
import LoadingComp from "../../components/Interface/LoadingComp";
import PendingRequest from "../../components/requests/PendingRequest";
import { OrdersDataObj } from "../../types/api/OrdersDataObj";
import useVendorOrders from "../../hooks/queries/requests/useVendorOrders";

const Tab = createMaterialTopTabNavigator();

export type VendorRequestScreenProps = NativeStackScreenProps<
  VendorRequestStackNav,
  "vendorRequests"
>;

export default function RequestScreen({
  navigation,
}: VendorRequestScreenProps) {
  const [results, setResults] = useState<OrdersDataObj[]>([]);
  const { data, isLoading } = useVendorOrders();
  const [isSearching, setIsSearching] = useState(false);

  function handleSearchQuery(t: string) {
    const res =
      Array.isArray(data) && data.filter(({ title }) => title.includes(t));
    setResults(res);
  }

  const searchInput = (
    <TextInput
      onChangeText={handleSearchQuery}
      style={[styles.search, { width: "100%" }]}
      placeholder="Search requests"
      editable={isSearching}
    />
  );

  function toggleSearch() {
    setIsSearching((p) => !p);
  }

  return (
    <View style={styles.container}>
      <AlertModal />

      {/* Search Modal */}
      <Modal isVisible={isSearching} onBackdropPress={toggleSearch}>
        <ModalWrapper
          extraStyles={{
            top: "22%",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          {searchInput}

          {/* Search Results */}
          <View style={styles.searchResultWrapper}>
            {isLoading && <LoadingComp />}
            <FlatList
              data={results}
              renderItem={({ item }) => {
                const budget = `${item.amount}`;
                const dateAndTime = new Date(item.createdAt).toDateString();
                return (
                  <PendingRequest.Vendor
                    budget={budget}
                    dateAndTime={dateAndTime}
                    service={item.title}
                    clientName={"Client"} //change to client name
                  />
                );
              }}
              keyExtractor={(item, i) => `${item._id}_${i}`}
            />
          </View>
        </ModalWrapper>
      </Modal>

      {/* Header */}
      <View style={styles.requestHeader}>
        <HeadingText>My Requests</HeadingText>

        {/* Filter */}
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="options-outline" size={24} color="#DE8E0E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Pressable onPress={toggleSearch}>
        <View style={styles.search}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="search-outline"
            size={24}
            color="grey"
          />
          <Text style={styles.searchText}>Search requests</Text>
        </View>
      </Pressable>

      {/* Tabs Screens */}
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "#DE8E0E",
            },
            tabBarStyle: {
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: "#E5E5E5",
              backgroundColor: "#FAFAFA",
            },
            tabBarLabelStyle: {
              textTransform: "none",
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            },
          }}
        >
          <Tab.Screen
            name="Pending"
            initialParams={{ navigation: navigation }}
            component={PendingScreen}
          />
          <Tab.Screen
            name="Active"
            initialParams={{ navigation: navigation }}
            component={ActiveScreen}
          />
          <Tab.Screen
            name="Past"
            initialParams={{ navigation: navigation }}
            component={PastScreen}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  requestHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  createButton: {
    padding: 10,
    backgroundColor: "#FDF9F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  searchText: {
    fontFamily: "OpenSansRegular",
    opacity: 0.7,
  },
  search: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  searchResultWrapper: {
    marginTop: 12,
    width: "100%",
    flex: 1,
  },
});
