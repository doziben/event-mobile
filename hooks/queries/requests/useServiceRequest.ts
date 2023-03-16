import { useQuery } from "react-query";
import api from "../../../api";
import { ServiceRequestData } from "../../../types/api/ServiceRequestDataObj";

export default function useServiceRequest(id: string) {
  return useQuery(
    ["service-requests", id],
    async () =>
      api
        .get(`/service-request/service/${id}`)
        .then((r) => r.data as ServiceRequestData),
    {
      enabled: !!id,
    }
  );
}
