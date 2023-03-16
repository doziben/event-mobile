import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { ServiceRequestDataObj } from "../../types/api/ServiceRequestDataObj";

export default function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ServiceRequestDataObj) => api.post("/service-request/service", data),
    { onSuccess: () => queryClient.invalidateQueries(["requests"]) }
  );
}
