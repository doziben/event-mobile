import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import api from "../../api";
import { CategoryDataObj } from "../../types/api/categoryDataObj";

export default function useCategories() {
  return useQuery(["categories"], () =>
    api.get("/categories").then((res) => res.data as CategoryDataObj[])
  );
}
