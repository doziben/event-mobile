import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

export default function useDeleteOrder(id: string) {
  const q = useQueryClient();
  const keys = ["client-orders", "vendor-orders"];
  return useMutation(() => api.patch(`/orders/cancel/${id}`), {
    onSuccess: () => q.invalidateQueries(keys),
  });
}
