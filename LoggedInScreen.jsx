import React from "react";
import Vendors from "./screens/vendors/Vendors";
import Customers from "./screens/customers/Customers";
import PremiumModalContextProvider from "./store/PremiumModalContext";
import EventAlertManager from "./components/notifications/EventAlertManager";
import ServicesContextProvider from "./store/ServicesContextProvider";

export default function LoggedInScreen({ currentUser }) {
  return (
    <EventAlertManager>
      {currentUser === "vendor" ? (
        <PremiumModalContextProvider>
          <Vendors />
        </PremiumModalContextProvider>
      ) : (
        <ServicesContextProvider>
          <Customers />
        </ServicesContextProvider>
      )}
    </EventAlertManager>
  );
}
