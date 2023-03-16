import { useQuery, UseQueryOptions } from "react-query";
import api from "../../../api";
import { ServiceRequestDataObj } from "../../../types/api/ServiceRequestDataObj";

type Params = string;

async function getData(params: Params) {
  const res = await api.get(`/service-request/service${params}`);
  const d = await res.data;

  return d.data as ServiceRequestDataObj[];
}

export default function useServiceRequests(
  params?: Params,
  options?: UseQueryOptions
) {
  return useQuery(["all-service-requests"], () => getData(params), options);
}
