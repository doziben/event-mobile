import { useMemo } from "react";
import { useQuery } from "react-query";
import api from "../../../api";
import { FormDto } from "../../../types/api/FormDto";

export default function useForms(formId?: string) {
  const query = useQuery(["forms"], () =>
    api.get(`/forms`).then((r) => r.data as FormDto[])
  );

  function getForm(id: string) {
    return (
      Array.isArray(query.data) &&
      query.data.find((form) => {
        return form?._id === id;
      })
    );
  }

  const form = useMemo(() => {
    return getForm(formId);
  }, [query.data, query.isFetched, query.isLoading]);

  return { ...query, form };
}
