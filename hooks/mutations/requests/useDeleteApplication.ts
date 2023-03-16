import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

export default function useDeleteApplication(id: string) {
  const q = useQueryClient();
  const keys = ["request-aplication", "all-service-requests"];

  return useMutation(
    () => api.delete(`/service-request/application/delete/${id}`),
    {
      onSuccess: () => q.invalidateQueries(keys),
    }
  );
}
