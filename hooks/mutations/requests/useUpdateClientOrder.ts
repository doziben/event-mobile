import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";
import { OrdersStatus } from "../../../types/api/OrdersDataObj";

export type UpdateClientOrderDto = {
  isSubmit?: boolean;
  status?: OrdersStatus;
};

export default function useUpdateClientOrder(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: UpdateClientOrderDto) => api.patch(`/orders/${orderId}`, data),
    {
      onSuccess: () => queryClient.invalidateQueries(["client-orders"]),
    }
  );
}
