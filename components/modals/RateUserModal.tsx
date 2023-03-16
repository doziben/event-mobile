import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import useReviewUser from "../../hooks/mutations/socials/useReviewUser";
import FormTextInput from "../Interface/FormTextInput";
import PrimaryButton from "../Interface/PrimaryButton";
import RatingItem from "../Interface/RatingItem";
import ModalHeader from "./ModalHeader";
import ModalWrapper from "./ModalWrapper";

interface RateUserModalProps {
  userId: string;
  title: string;
  isVendor?: boolean;
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

type optionData = {
  q: string;
  v: string | boolean;
};

export default function RateUserModal({
  setVisibility,
  title,
  userId,
  visible,
  isVendor,
}: RateUserModalProps) {
  const { mutate, isLoading } = useReviewUser(userId);
  const [options, setOptions] = useState<optionData[]>([
    { q: "Was the vendor on time?", v: "" },
    { q: "Were you satisfied with the vendor’s performance?", v: "" },
    { q: "Was the vendor professional?", v: "" },
  ]);

  const [formData, setFormData] = useState({
    rating: 0,
    comments: "",
  });

  function updateFormData(key: string, value: string | number) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function rateUser() {
    mutate(
      {
        comment: formData.comments,
        rating: formData.rating,
        onTime: typeof options[0].v === "boolean" ? options[0].v : true,
        satisfied: typeof options[1].v === "boolean" ? options[1].v : true,
        professional: typeof options[2].v === "boolean" ? options[2].v : true,
      },
      {
        onSuccess: () => (
          setVisibility(false), alert("Thank you for your feedback!")
        ),
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  return (
    <View>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisibility(false)}
        avoidKeyboard
      >
        <ModalWrapper>
          <ModalHeader title={title} onClose={() => setVisibility(false)} />

          {/* Questions for vendors */}
          {isVendor && (
            <View style={{ width: "100%", marginTop: 12 }}>
              {options.map(({ q, v }, i) => {
                //** When an answer is selected */
                function onSelect(value: boolean) {
                  setOptions((p) => {
                    const ind = p.findIndex((obj) => obj.q === q);
                    p[ind]["v"] = value;
                    return [...p];
                  });
                }

                return (
                  <View key={q} style={styles.row}>
                    <Text style={styles.label}>{q}</Text>

                    {/* Options */}
                    <View style={styles.optionsWrapper}>
                      <TouchableOpacity
                        onPress={() => onSelect(false)}
                        style={[
                          styles.option,
                          { marginRight: 8 },
                          v.toString() === "false"
                            ? styles.active
                            : styles.undefined,
                        ]}
                      >
                        <Text
                          style={[
                            v.toString() === "false"
                              ? styles.activeText
                              : styles.undefinedText,
                          ]}
                        >
                          No
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => onSelect(true)}
                        style={[
                          styles.option,
                          v.toString() === "true"
                            ? styles.active
                            : styles.undefined,
                        ]}
                      >
                        <Text
                          style={[
                            v.toString() === "true"
                              ? styles.activeText
                              : styles.undefinedText,
                          ]}
                        >
                          Yes
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Rating component */}
          <RatingItem.Rate onRate={(v) => updateFormData("rating", v)} />

          {/* Comments */}
          <FormTextInput
            label="Add Comments"
            placeholder="Add comments (optional)"
            onChangeText={(t) => updateFormData("comments", t)}
            value={formData.comments}
            extraStyles={{ width: "100%" }}
            extraInputOptions={{
              numberOfLines: 2,
              multiline: true,
              style: styles.input,
            }}
          />

          {/* Button */}
          <PrimaryButton
            title="Submit"
            onPress={rateUser}
            isLoading={isLoading}
            extraStyles={{ width: "100%" }}
          />
        </ModalWrapper>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontFamily: "OpenSansSemiBold",
    color: "#343434",
    fontSize: 12,
    marginRight: 8,
    width: "50%",
  },
  optionsWrapper: {
    flexDirection: "row",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  undefined: {
    backgroundColor: "#fafafa",
    borderColor: "#D2D2D2",
  },
  active: {
    backgroundColor: "#FDF9F3",
    borderColor: "#DE8E0E",
  },
  undefinedText: {
    color: "#343434",
  },
  activeText: {
    color: "#DE8E0E",
  },
  input: {
    minHeight: 56,
    textAlignVertical: "top",
    padding: 12,
    marginTop: 8,
  },
});
