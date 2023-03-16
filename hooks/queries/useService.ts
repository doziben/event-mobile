import { useQuery } from "react-query";
import api from "../../api";
import { ServiceDataObj } from "../../types/api/categoryDataObj";

//** For getting any category/service  */
export default function useService(serviceId: string) {
  return useQuery(
    ["service", serviceId],
    async () =>
      api
        .get(`/categories/${serviceId}`)
        .then((r) => r.data as ServiceDataObj)
        .catch((e) => console.log(e)),
    { enabled: !!serviceId }
  );
}
