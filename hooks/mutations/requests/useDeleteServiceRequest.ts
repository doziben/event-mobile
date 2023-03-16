import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

export default function useDeleteServiceRequest(id: string) {
  const q = useQueryClient();
  const keys = ["service-requests", "all-service-requests"];

  return useMutation(
    () => api.delete(`/service-request/service/delete/${id}`),
    {
      onSuccess: () => q.invalidateQueries(keys),
    }
  );
}
