import { useQuery } from "react-query";
import api from "../../../api";
import { currentUserDataObj } from "../../../types/api/currentUserDataObj";
import { ServiceRequestDataObj } from "../../../types/api/ServiceRequestDataObj";
import useUser from "../useUser";

export default function useClientServiceRequest() {
  const user = useUser();
  const userData = user?.data as currentUserDataObj;
  const uid = userData?._id;

  return useQuery(
    ["requests"],
    () =>
      api
        .get(`/service-request/service-user/${uid}`)
        .then((res) => res.data as ServiceRequestDataObj[]),
    { enabled: !!uid }
  );
}
