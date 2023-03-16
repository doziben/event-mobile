import { useQuery } from "react-query";
import api from "../../../api";
import { OrdersDataObj } from "../../../types/api/OrdersDataObj";
import useUser from "../useUser";

export default function useVendorOrders(id?: string, filters?: []) {
  const user = useUser();
  const vendorId = id ?? user.data?._id;

  return useQuery(["vendor-orders"], () =>
    api
      .get(`/orders/job/${vendorId}`)
      .then((r) => r.data as OrdersDataObj[])
      .catch((e) => console.log(e))
  );
}
