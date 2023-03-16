import useUser from "../queries/useUser";
import useCountriesStates from "../../data/countriesStatesServer";
import { flutterwaveCurrencies } from "../../data/flutterwave";

export default function useUserCurrency() {
  const { data: userData } = useUser();

  const { data, getCountry, isLoading } = useCountriesStates();

  const userCountry =
    Array.isArray(data) && getCountry(null, userData?.country);

  const currency = userCountry?.currency ?? "$";

  const userCurrency = currency;

  return userCurrency;
}
