import { useQuery } from "react-query";
import api from "../../../api";
import {
  ServiceRequestData,
  ServiceRequestDataObj,
} from "../../../types/api/ServiceRequestDataObj";
import useUser from "../useUser";
import { OrdersStatus } from "../../../types/api/OrdersDataObj";

interface VendorApplicationDto {
  _id: string;
  userId: string;
  serviceRequest: any;
  date: string;
  rate: number;
  status: OrdersStatus;
  email: string;
  customizeRate: boolean;
  description: string;
  trx_ref: string;
}

export default function useVendorApplications(id?: string, params?: string) {
  const user = useUser();
  const vendorId = id ?? user.data?._id;

  return useQuery(["vendor-application"], () =>
    api
      .get(`/service-request/application-user/${vendorId}${params}`)
      .then((r) => r.data as VendorApplicationDto[])
  );
}
