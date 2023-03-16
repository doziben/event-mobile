import { useQuery } from "react-query";
import api from "../../api";
import { CategoryDataObj } from "../../types/api/categoryDataObj";

export default function useAllServices() {
  return useQuery(["all-services"], () =>
    api.get(`/categories/services`).then((r) => r.data as CategoryDataObj[])
  );
}
