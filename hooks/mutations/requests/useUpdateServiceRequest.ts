import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";
import { ServiceRequestDataObj } from "../../../types/api/ServiceRequestDataObj";

export default function useUpdateServiceRequest(id: string) {
  const q = useQueryClient();
  const keys = ["service-requests", "all-service-requests"];

  return useMutation(
    (data: ServiceRequestDataObj) =>
      api.patch(`/service-request/service/update/${id}`, data),
    {
      onSuccess: () => q.invalidateQueries(keys),
    }
  );
}
