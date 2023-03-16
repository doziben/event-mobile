import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { ServiceApplication } from "../../types/api/serviceApplication";

export default function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: ServiceApplication) =>
      api.post(`/service-request/application`, data).then((d) => d.data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          "request-aplication",
          "all-service-requests",
        ]),
    }
  );
}
