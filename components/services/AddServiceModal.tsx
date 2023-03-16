import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";
import useVendorServices from "../../hooks/queries/useVendorServices";
import { PendingActionsContext } from "../../store/PendingActionsContaxt";
import { PremiumModalContext } from "../../store/PremiumModalContext";
import { Cancellation } from "../../types/api/currentUserDataObj";
import FormDropDown from "../Interface/FormDropDown";
import FormTextInput from "../Interface/FormTextInput";
import HeadingText from "../Interface/HeadingText";
import PressableIcon from "../Interface/PressableIcon";
import PrimaryButton from "../Interface/PrimaryButton";
import TextButton from "../Interface/TextButton";
import ModalHeader from "../modals/ModalHeader";
import AddServiceInput from "./AddServiceInput";

interface AddServiceModal {
  open: boolean;
  onClose: () => void;
  service: { id: string; name: string };
}

type ServiceFormState = {
  baseRate: string;
  hourlyRate: string;
  rehearsalRate: string;
};

type CancellationFee = {
  interval: "Days" | "Weeks" | "Months";
  number: number;
  fee: number;
};

type service = {
  category: string;
  baseRate: number;
  hourlyRate: number;
  rehearsalRate: number;
  cancellation: Cancellation[];
};

type DTO = service[];

const initialState = {
  baseRate: "",
  hourlyRate: "",
  rehearsalRate: "",
};

export default function AddServiceModal({
  onClose,
  open,
  service,
}: AddServiceModal) {
  const options: CancellationFee["interval"][] = ["Days", "Weeks", "Months"];

  const { setVisibility } = useContext(PremiumModalContext);
  const [formState, setFormState] = useState<ServiceFormState>(initialState);
  const formDataIsValiid = Object.values(formState).every((v) => v > "");
  const { plan, services, refetch } = useVendorServices();
  const { mutate, isLoading } = useUpdateUser();
  const { id, name } = service;

  const { scrollEnabled } = useContext(PendingActionsContext);
  const [menu, setMenu] = useState(-1);

  let row: Array<any> = [];
  let prevOpenedRow;

  const defaultC: CancellationFee = {
    number: 1,
    fee: 12,
    interval: "Days",
  };

  const [c, setC] = useState<CancellationFee[]>([defaultC]);

  // Adding cancellation fee
  function addNew() {
    if (plan === "freemium") {
      //show upgrade modal
      setVisibility(true);
    } else {
      setC((p) => {
        return [...p, defaultC];
      });
    }
  }

  // Remove cancellation fee
  function remove(index: number) {
    setC((p) => {
      const newArr = p?.filter((_, i) => i !== index);
      return newArr;
    });
  }

  // Updating Cancellation Object
  function updateCancellation(
    index: number,
    prop: string,
    value: string | number
  ) {
    setC((p) => {
      if (Array.prototype.lastIndexOf(index) == -1) {
        return p;
      }
      const obj = p[index];
      obj[prop] = value;
      return p;
    });
  }

  function closeModal() {
    onClose();
  }

  function updateForm(key: string, value: string) {
    setFormState((prev) => ({ ...prev, [key]: value }));
  }

  function submitForm() {
    const { baseRate, hourlyRate, rehearsalRate } = formState;

    const cancellation: Cancellation[] = c.map(({ fee, interval, number }) => {
      let multiplier = 1;

      if (interval === "Weeks") {
        multiplier = 7;
      } else if (interval === "Months") {
        multiplier = 30;
      }
      return { interval: multiplier * number, percentage: fee };
    });

    const newService = {
      category: id,
      baseRate: parseInt(baseRate),
      hourlyRate: parseInt(hourlyRate),
      rehearsalRate: parseInt(rehearsalRate),
      cancellation,
    };

    const isFreemium = plan === "freemium";
    const oldArr =
      services
        ?.filter((v) => v.category._id !== id)
        ?.map((v) => ({
          ...v,
          category: v.category._id,
        })) ?? [];
    const premArr: DTO = [...oldArr, newService];

    const dat: DTO = isFreemium ? [newService] : premArr;
    console.log({ services: dat });

    if (formDataIsValiid) {
      mutate(
        { services: dat },
        {
          onSuccess: (e) => (
            refetch(),
            closeModal(),
            alert("Service Added Successfully"),
            console.log(e)
          ),
          onError: (e: any) => alert(e?.response?.data?.message),
        }
      );
    } else {
      alert("Please fill in all fields");
      console.log(formState);
    }
  }

  return (
    <>
      <View>
        <Modal visible={open} animationType="slide">
          <SafeAreaView style={styles.wrapper}>
            <ModalHeader title="Add Rate" onClose={closeModal} />
            <Text style={styles.text}>Enter your rates for {name} service</Text>

            <ScrollView
              scrollEnabled={scrollEnabled}
              keyboardShouldPersistTaps="always"
            >
              {/* Form */}
              <View style={styles.form}>
                <AddServiceInput
                  name="Enter base rate"
                  placeholder="Enter base rate"
                  onChangeText={(value) => updateForm("baseRate", value)}
                />
                <AddServiceInput
                  name="Enter hourly rate"
                  placeholder="Enter hourly rate"
                  onChangeText={(value) => updateForm("hourlyRate", value)}
                />
                <AddServiceInput
                  name="Enter rehearsal rate"
                  placeholder="Enter rehearsal rate"
                  onChangeText={(value) => updateForm("rehearsalRate", value)}
                />
              </View>

              {/* Cancellation */}
              <View>
                <HeadingText lg>Cancellation</HeadingText>
                <Text style={styles.text}>
                  Enter your cancellation charges. Swipe left to delete a
                  cancellation box
                </Text>

                {c.map(({ fee, interval, number }, i) => {
                  const closeRow = (index) => {
                    console.log("closerow");
                    if (prevOpenedRow && prevOpenedRow !== row[index]) {
                      prevOpenedRow.close();
                    }
                    prevOpenedRow = row[index];
                  };

                  const renderRightActions = (progress, dragX) => {
                    return (
                      <View
                        style={{
                          margin: 0,
                          alignContent: "center",
                          justifyContent: "center",
                          width: 70,
                        }}
                      >
                        <PressableIcon
                          icon={
                            <Feather
                              name="delete"
                              color={"red"}
                              size={24}
                              style={styles.delete}
                            />
                          }
                          onPress={() => remove(i)}
                        />
                      </View>
                    );
                  };

                  return (
                    <Swipeable
                      key={`${interval}${i}`}
                      renderRightActions={(progress, dragX) =>
                        renderRightActions(progress, dragX)
                      }
                      onSwipeableOpen={() => closeRow(i)}
                      ref={(ref) => (row[i] = ref)}
                      childrenContainerStyle={{
                        overflow: "visible",
                        paddingBottom: menu === i ? 100 : 0,
                      }}
                      containerStyle={{ overflow: "visible" }}
                    >
                      <View style={styles.cancellationWrapper}>
                        <View style={styles.cancellation}>
                          <FormTextInput
                            label=""
                            placeholder="30"
                            onChangeText={(t) =>
                              updateCancellation(i, "number", t)
                            }
                            extraStyles={{ width: "25%" }}
                            extraInputOptions={{ keyboardType: "number-pad" }}
                          />
                          <View style={{ maxWidth: "35%" }}>
                            {/* Change the options to plural when the value is greater than 1  */}
                            <FormDropDown
                              label=""
                              onOpen={() => setMenu(i)}
                              onClose={() => setMenu(-1)}
                              onChangeValue={(v) =>
                                updateCancellation(i, "interval", v)
                              }
                              options={options.map((v) => ({
                                label: c[i].number > 1 ? v + "s" : v,
                                value: v,
                              }))}
                              placeholder={interval}
                              zIndex={c.length - i}
                              zIndexInverse={i}
                            />
                          </View>
                          <FormTextInput
                            label=""
                            placeholder="5"
                            onChangeText={(t) =>
                              updateCancellation(i, "fee", t)
                            }
                            extraStyles={{ width: "30%" }}
                            extraInputOptions={{ keyboardType: "number-pad" }}
                            hasTag
                            tag="%"
                          />
                        </View>
                      </View>
                    </Swipeable>
                  );
                })}
              </View>

              <View>
                {c?.length < 3 && (
                  <TextButton
                    title="Add +"
                    onPress={addNew}
                    style={{ width: "20%" }}
                  />
                )}
                <PrimaryButton
                  title="Save"
                  onPress={submitForm}
                  extraStyles={styles.button}
                  isLoading={isLoading}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
  },
  text: {
    marginTop: 12,
    fontFamily: "OpenSansRegular",
    fontSize: 14,
    color: "#767676",
    width: "100%",
  },
  form: { marginTop: 16, width: "100%" },
  button: {
    width: "100%",
    marginTop: 20,
  },
  delete: {
    marginBottom: "50%",
    marginLeft: "50%",
  },
  cancellation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancellationWrapper: {
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 8,
  },
  add: {
    marginVertical: 12,
    textAlign: "right",
  },
});
