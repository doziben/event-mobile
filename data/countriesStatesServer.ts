import { useQuery } from "react-query";
import api from "../api";
import jsonFiles from "../data/countriesstates.json";

export default function useCountriesStates() {
  const { data, isLoading } = useQuery(["countries"], () =>
    api.get("/country/states").then((r) => r.data)
  );

  function getCountry(country?: string, id?: string) {
    if (country) {
      const countryData =
        Array.isArray(data) && data.find(({ name }) => name === country);

      return { ...countryData };
    } else if (id) {
      const countryData =
        Array.isArray(data) && data.find(({ _id }) => _id === parseInt(id));

      return { ...countryData };
    } else {
      return;
    }
  }

  return { getCountry, data, isLoading };
}
