import { useQuery } from "react-query";
import api from "../../api";
import { ServiceDataObj } from "../../types/api/categoryDataObj";

export default function useServices(category: string) {
  return useQuery(
    ["services", category],
    () =>
      api
        .get(`/categories/services/${encodeURIComponent(category)}`)
        .then((re) => re.data as ServiceDataObj[]),
    {
      enabled: !!category,
    }
  );
}
