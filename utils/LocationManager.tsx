import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  reverseGeocodeAsync,
} from "expo-location";
import { useCallback, useEffect, useState } from "react";

import { Alert } from "react-native";
import useUpdateUser from "../hooks/mutations/useUpdateUser";
import useUser from "../hooks/queries/useUser";
import { currentUserDataObj } from "../types/api/currentUserDataObj";

//Retest this functionality
//It does not update location until i refresh the component
export default function LocationManager() {
  const [bounce, setBounce] = useState(1);
  const user = useUser();
  const userData = user?.data as currentUserDataObj;
  const uid = userData?._id;

  const { mutate } = useUpdateUser(uid);

  //** Check Location permissions */
  const [status, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (status.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (status.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permissions Required",
        "Location permissions are needed to continue"
      );
      return false;
    }
  }

  //** Handling location */
  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();
    const location = await getCurrentPositionAsync();

    //** Reverse geocoding */
    const { coords } = location;
    const { longitude, latitude } = coords;

    let geocodeResponse = await reverseGeocodeAsync({
      latitude,
      longitude,
    });

    geocodeResponse.map((obj) => {
      const localeData = {
        address: obj.name,
        city: obj.city,
        state: obj.region,
        postalCode: obj.postalCode,
        country: obj.country,
      };

      const data = { ...userData, ...localeData };

      mutate(data, {
        onSuccess: (e) => console.log("location updated"),
      });
    });
  }

  useEffect(() => {
    getLocationHandler();

    const timeout = setTimeout(() => {
      bounce < 3 && setBounce((b) => b + 1);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, [bounce]);

  return <></>;
}
