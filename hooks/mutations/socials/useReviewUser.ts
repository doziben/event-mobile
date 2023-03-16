import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";
import useUser from "../../queries/useUser";

type ReviewDto = {
  image?: string;
  name?: string;
  rating: number;
  comment: string;
  onTime: boolean;
  satisfied: boolean;
  professional: boolean;
};

export default function useReviewUser(userId: string) {
  const queryClient = useQueryClient();
  const { data: myData } = useUser();

  return useMutation(
    async (data: ReviewDto) =>
      api.post(`/users/review/${userId}`, {
        ...data,
        name: myData?.firstName,
        image: myData?.image,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["reviews", userId]),
    }
  );
}
