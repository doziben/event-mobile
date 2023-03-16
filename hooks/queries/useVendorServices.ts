import { useQuery } from "react-query";
import api from "../../api";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import useUser from "./useUser";

export default function useVendorServices(id?: string) {
  const user = useUser();
  const vendorId = id ?? user.data?._id;

  const { data, isLoading, refetch, isFetched } = useQuery(
    ["vendor-services"],
    async () =>
      api.get(`/users/${vendorId}`).then((r) => r.data as currentUserDataObj)
  );

  const services = data?.services;

  const plan = data?.plan;
  return { isLoading, services, plan, refetch };
}
