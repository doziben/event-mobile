import { useContext } from "react";
import { GestureResponderEvent, View } from "react-native";
import useCountriesStates from "../../../data/countriesStatesServer";
import useUserCurrency from "../../../hooks/custom/useUserCurrency";
import useDressCodes from "../../../hooks/queries/misc/useDressCodes";
import useEventTypes from "../../../hooks/queries/misc/useEventTypes";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import getTimeString from "../../../utils/GetTimeString";
import Divider from "../../Interface/Divider";
import HeadingText from "../../Interface/HeadingText";
import PrimaryButton from "../../Interface/PrimaryButton";
import SummaryItem from "../../requests/SummaryItem";

interface RequestSummaryProps {
  onClickEdit: (e: number) => void;
  onClickSubmit: (e: GestureResponderEvent) => void;
  //** For when the form is submitted */
  isLoading: boolean;
}

export default function RequestSummary({
  onClickSubmit,
  onClickEdit,
  isLoading,
}: RequestSummaryProps) {
  const requestFormCtx = useContext(RequestServiceContext);
  const { services, formValues } = requestFormCtx;
  const { eventDetails, others, rehearsals } = formValues;
  const { getCountry } = useCountriesStates();

  const { data: dressCodes } = useDressCodes();
  const { data: eventTypes } = useEventTypes();

  const eventType =
    eventTypes && eventTypes.find(({ _id }) => _id === others?.eventType)?.name;

  const date = new Date(eventDetails?.date).toDateString();
  const time = getTimeString({ date: new Date(eventDetails?.time) });
  const dressCode =
    dressCodes && dressCodes.find(({ _id }) => _id === others?.dressCode)?.name;

  const address = eventDetails?.address;

  const currency = getCountry(
    null,
    formValues.eventDetails.country?.toString()
  )?.currency;

  const budget =
    others?.budget?.type === "fixed"
      ? `${currency}${others?.budget?.fixedPrice.reduce((a, b) => a + b, 0)}`
      : others?.budget?.range?.map(
          ({ min, max }, i) => `${currency}${min} - ${currency}${max}`
        );

  return (
    <View
      style={{
        backgroundColor: "#fafafa",
      }}
    >
      {/* Header */}
      <HeadingText lg extraStyles={{ marginBottom: 16 }}>
        Request Summary
      </HeadingText>

      {/* First Summary Items*/}
      <SummaryItem
        label="Service"
        value={services.map(({ name }) => name.toString()).toString() + "\n"}
        onEdit={() => onClickEdit(1)}
      />
      <SummaryItem
        label="Event Type"
        value={eventType}
        onEdit={() => onClickEdit(3)}
      />
      <SummaryItem label="Date" value={date} onEdit={() => onClickEdit(1)} />
      <SummaryItem label="Time" value={time} onEdit={() => onClickEdit(1)} />
      <SummaryItem
        label="Dress code"
        value={dressCode}
        onEdit={() => onClickEdit(3)}
      />

      {/* Address */}
      <Divider />
      <SummaryItem
        label="Address"
        value={address}
        onEdit={() => onClickEdit(1)}
        hideLabel
      />
      <Divider />

      {/* Pricing */}
      <SummaryItem
        label="Your budget"
        value={budget.toString()}
        onEdit={() => onClickEdit(3)}
      />

      <Divider />
      <PrimaryButton
        onPress={onClickSubmit}
        title="Submit Request"
        isLoading={isLoading}
      />
    </View>
  );
}
