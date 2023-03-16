import { VendorService } from "../api/currentUserDataObj";

export type CustomerRequestStack = {
  requests: undefined;
  vendorApplications: { serviceId: string; categoryName: string };
  makePayment: {
    requestId: string;
    rate: number;
    applicationId: string;
    cancellation: VendorService["cancellation"];
  };
  vendorProfile: { userId: string };
};
