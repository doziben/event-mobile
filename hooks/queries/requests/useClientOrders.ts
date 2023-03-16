import { useQuery } from "react-query";
import api from "../../../api";
import { OrdersDataObj } from "../../../types/api/OrdersDataObj";
import useUser from "../useUser";

export default function useClientOrders(id?: string, filters?: []) {
  const user = useUser();
  const clientId = id ?? user.data?._id;

  return useQuery(["client-orders"], () =>
    api
      .get(`/orders/client/${clientId}`)
      .then((r) => r.data as OrdersDataObj[])
      .catch((e) => console.log(e))
  );
}
