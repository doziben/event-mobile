import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import api from "../../../api";
import EmptyEvents from "../../../assets/illustrations/EmptyEvents";
import EmptyState from "../../../components/Interface/EmptyState";
import LoadingComp from "../../../components/Interface/LoadingComp";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import EventAvailable from "../../../components/requests/EventAvailable";
import useServiceRequests from "../../../hooks/queries/requests/useServiceRequests";
import useUser from "../../../hooks/queries/useUser";
import useVendorServices from "../../../hooks/queries/useVendorServices";

export async function getData() {
  const res = await api.get(`/service-request/service`);
  const d = await res.data;

  return d.data;
}

export default function VendorEvents() {
  const user = useUser();
  const {
    data: rawData,
    isLoading,
    isRefetching,
    refetch: refresh,
  } = useServiceRequests(`?user=${user?.data?._id}`, {
    enabled: !!user?.data?._id,
    staleTime: 10,
  });

  const { isLoading: servicesLoading, services, refetch } = useVendorServices();
  const isOnHoliday = user?.data?.holidayMood;

  const data =
    Array.isArray(rawData) &&
    rawData.filter((dat) => {
      const isVendorState = user?.data?.country === dat?.country?._id; //change to state later
      const isSavedLocation = user?.data?.savedLocation?.includes(dat?.country);

      const isVendorLocation = isVendorState || isSavedLocation;
      const isVendorService =
        Array.isArray(services) &&
        services?.some(({ category }) => category?._id === dat?.category);

      // console.log({ serv: services[0]?.category, job: dat?.category });

      //** No Applications */
      if (!dat?.applications) {
        return isVendorService && isVendorLocation;
      }

      //** If the vendor has already applied for the job */
      const hasApplied = dat?.applications.filter(
        (a) => a?.email !== user?.data?.email
      );

      return !hasApplied && isVendorService;
    });

  const dataIsValid = Array.isArray(data) && data.length > 0;

  useEffect(() => {
    refetch();
  });

  return isLoading || servicesLoading ? (
    <LoadingComp />
  ) : (
    <View style={styles.container}>
      {!dataIsValid && !isOnHoliday && (
        <EmptyState
          illustration={<EmptyEvents />}
          title="No Nearby Events Yet"
          message={`There are no available events for you yet..`}
          CTA={
            <PrimaryButton
              title="Refresh"
              onPress={() => refresh()}
              extraStyles={{ marginVertical: 20 }}
              isLoading={isRefetching || isLoading}
            />
          }
        />
      )}

      {dataIsValid && !isOnHoliday && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: "50%",
          }}
          refreshing={isRefetching}
          onRefresh={refresh}
          style={{ margin: 20 }}
          data={data}
          renderItem={({ item }) => {
            return (
              <EventAvailable
                clientId={item.userId}
                requestId={item._id}
                time={item.createdAt}
                title={item.title}
                onApply={() => {
                  setTimeout(() => refresh(), 4000);
                }}
              />
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )}

      {/* Holiday Mode */}
      {isOnHoliday && (
        <EmptyState
          illustration={<EmptyEvents />}
          title="You are set to holiday mode :)"
          message={`Turn off holiday mode to start seeing events`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  emptyView: {
    marginVertical: 24,
    textAlign: "center",
    alignItems: "center",
  },
  headingText: {
    marginTop: 16,
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  bodyText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
