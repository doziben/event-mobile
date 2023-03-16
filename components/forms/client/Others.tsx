import { useContext, useEffect, useState } from "react";
import { GestureResponderEvent, View } from "react-native";
import useCountriesStates from "../../../data/countriesStatesServer";
import useUserCurrency from "../../../hooks/custom/useUserCurrency";
import useDressCodes from "../../../hooks/queries/misc/useDressCodes";
import useEventTypes from "../../../hooks/queries/misc/useEventTypes";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import FormDropDown, { FormDropDownProps } from "../../Interface/FormDropDown";
import FormRangeInput from "../../Interface/FormRangeInput";
import FormTextInput from "../../Interface/FormTextInput";
import HeadingText from "../../Interface/HeadingText";
import PrimaryButton from "../../Interface/PrimaryButton";
import TabSelect from "../../Interface/TabSelect";

interface OthersFormProps {
  onClickNext: (e: GestureResponderEvent) => void;
}

const dayOptions: FormDropDownProps["options"] = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
];

export interface OthersFormData {
  eventType: string;
  recurring: boolean;
  recurringInterval: "weekly" | "monthly";
  recurringDay: number;
  recurringDayMonth: number;
  dressCode: string;
  budget: {
    type: "fixed" | "range";
    fixedPrice: number[];
    range: { min: number; max: number }[];
  };
  numberOfResponse: number;
  experienceLevel: "freemium" | "premium" | "elite";
}

export default function OthersForm({ onClickNext }: OthersFormProps) {
  const { services, updateForm, formValues } = useContext(
    RequestServiceContext
  );
  const { others } = formValues;
  const initialFormData: OthersFormData = {
    eventType: others?.eventType ?? "",
    recurring: others?.recurring ?? false,
    recurringInterval: others?.recurringInterval ?? "weekly",
    recurringDay: others?.recurringDay ?? 1,
    recurringDayMonth: others?.recurringDayMonth ?? 1,
    dressCode: others?.dressCode ?? "",
    budget: others?.budget ?? {
      type: "fixed",
      fixedPrice: [0],
      range: services?.map((s) => ({ min: 0, max: 0 })),
    },
    numberOfResponse: others?.numberOfResponse ?? 5000,
    experienceLevel: others?.experienceLevel ?? "freemium",
  };

  const { getCountry } = useCountriesStates();

  const currency = getCountry(
    null,
    formValues.eventDetails.country?.toString()
  )?.currency;
  const { data: dressCodes } = useDressCodes();
  const { data: eventTypes } = useEventTypes();

  const [formData, setFormData] = useState<OthersFormData>(initialFormData);

  const budgetRange = formData.budget.range;
  const fixedPrice = formData.budget.fixedPrice;
  const formIsValid =
    (formData.eventType &&
      formData.dressCode &&
      ((budgetRange[0].min && budgetRange[0].max) ||
        fixedPrice[0].toString())) > "";

  //** FormInput Handler */
  function formInputHandler(
    name: string,
    value: string | boolean | number | Object
  ) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  //** Update range price */
  function updateRange(what: "min" | "max", value: string, index: number) {
    const range = formData?.budget?.range;
    range[index][what] = !!value ? parseInt(value) : 0;

    setFormData((p) => {
      return {
        ...p,
        budget: {
          ...p?.budget,
          range,
        },
      };
    });
  }

  //** Update fixed price */
  function updateFixedPrice(value: string, index: number) {
    formData.budget.fixedPrice[index] = parseInt(value);
  }

  //** Submit Handler */
  function submitHandler(e: GestureResponderEvent) {
    const rangeInValid = formData?.budget?.range?.some((r) => r?.min > r?.max);

    if (rangeInValid) {
      alert(
        "The minimum range value must be lesser than the maximum range value"
      );
      return;
    }

    if (formIsValid) {
      updateForm("others", formData);
      onClickNext(e);
    } else {
      alert("Please fill in the required fields");
    }
  }

  return (
    <View>
      {/* Event Type */}
      {eventTypes && (
        <>
          <HeadingText lg extraStyles={{ marginBottom: 16 }}>
            Event Type
          </HeadingText>

          <FormDropDown
            label="Event type"
            options={eventTypes.map(({ name, _id }) => ({
              label: name,
              value: _id,
            }))}
            placeholder="Event Type"
            defaultValue={formData.eventType}
            onChangeValue={(e) => formInputHandler("eventType", e)}
          />
        </>
      )}
      <TabSelect
        options={[
          { name: "No", onPress: () => formInputHandler("recurring", false) },
          { name: "Yes", onPress: () => formInputHandler("recurring", true) },
        ]}
        label="Recurring event?"
      />
      {/* If Recurring */}
      {formData.recurring && (
        <>
          <TabSelect
            label="Select Period"
            options={[
              {
                name: "Weekly",
                onPress: () => formInputHandler("recurringInterval", "weekly"),
              },
              {
                name: "Monthly",
                onPress: () => formInputHandler("recurringInterval", "monthly"),
              },
            ]}
          />

          {/* If monthly or Weekly */}
          {formData.recurringInterval === "monthly" ? (
            <FormTextInput
              label="What day of the month?"
              placeholder="1"
              onChangeText={(e) =>
                formInputHandler("recurringDayMonth", parseInt(e))
              }
              extraInputOptions={{ keyboardType: "number-pad", maxLength: 2 }}
              value={formData.recurringDay?.toString()}
            />
          ) : (
            <FormDropDown
              options={dayOptions}
              label="What Day?"
              placeholder="Select Day"
              onChangeValue={(value) =>
                formInputHandler("recurringDay", parseInt(value))
              }
              defaultValue={formData.recurringDay?.toString()}
            />
          )}
        </>
      )}

      {/* DressCode */}
      {dressCodes && (
        <>
          <HeadingText lg extraStyles={{ marginBottom: 16, marginTop: 12 }}>
            Dress Code
          </HeadingText>
          <FormDropDown
            options={dressCodes.map(({ _id, name }) => {
              return { label: name, value: _id };
            })}
            placeholder="Enter dresscode"
            label="Dress code"
            onChangeValue={(e) => formInputHandler("dressCode", e)}
            defaultValue={formData.dressCode}
          />
        </>
      )}

      {/* Budget */}
      <HeadingText lg extraStyles={{ marginBottom: 16, marginTop: 12 }}>
        Budget
      </HeadingText>
      {/* <TabSelect
        options={[
          {
            name: "Fixed Price",
            isSelected: formData.budget.type === "fixed",
            onPress: () =>
              formInputHandler("budget", { ...formData.budget, type: "fixed" }),
          },
          {
            name: "Range",
            isSelected: formData.budget.type === "range",
            onPress: () =>
              formInputHandler("budget", { ...formData.budget, type: "range" }),
          },
        ]}
        label="Budget"
      /> */}
      {formData.budget.type === "range" ? (
        <>
          {services.map((service, index) => (
            <FormRangeInput
              label={service?.name}
              tag={currency}
              key={service?.id}
              onChangeMax={(text) => {
                console.log({
                  max: text,
                  index,
                });
                updateRange("max", text, index);
              }}
              onChangeMin={(text) => {
                console.log({
                  min: text,
                  index,
                });
                updateRange("min", text, index);
              }}
              errorMessage={
                formData?.budget?.range[index]?.min >
                formData?.budget?.range[index]?.max
                  ? "Minimum value must be less than the maximum value"
                  : ""
              }
            />
          ))}
        </>
      ) : (
        <>
          {services.map((service, index) => (
            <FormTextInput
              key={service.id}
              label={service.name}
              tag={currency}
              hasTag
              placeholder="Enter Amount e.g 400"
              onChangeText={(text) => updateFixedPrice(text, index)}
              extraInputOptions={{ keyboardType: "number-pad" }}
            />
          ))}
        </>
      )}

      {/* Vendor Pref */}
      <HeadingText lg extraStyles={{ marginBottom: 16, marginTop: 12 }}>
        Vendor Preferences
      </HeadingText>

      <FormTextInput
        label="How many vendors would you like to respond?"
        onChangeText={(value) =>
          formInputHandler("numberOfResponse", parseInt(value))
        }
        placeholder="Number of responses (optional)"
        extraInputOptions={{ keyboardType: "number-pad" }}
      />
      <TabSelect
        options={[
          {
            name: "All",
            onPress: () => formInputHandler("experienceLevel", "freemium"),
            isSelected: formData?.experienceLevel === "freemium",
          },
          {
            name: "Premium",
            onPress: () => formInputHandler("experienceLevel", "premium"),
            isSelected: formData?.experienceLevel === "premium",
          },
          {
            name: "Elite",
            onPress: () => formInputHandler("experienceLevel", "elite"),
            isSelected: formData?.experienceLevel === "elite",
          },
        ]}
        label="Desired experience level"
      />

      {/* Submit Button */}
      <View style={{ marginVertical: 16 }}>
        <PrimaryButton onPress={submitHandler} isLoading={false} title="Next" />
      </View>
    </View>
  );
}
