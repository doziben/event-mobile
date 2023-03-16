import { Feather } from "@expo/vector-icons";
import { useContext, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import EventDetails from "../../../components/forms/client/EventDetails";
import OthersForm from "../../../components/forms/client/Others";
import Rehearsals from "../../../components/forms/client/Rehearsals";
import RequestSummary from "../../../components/forms/client/RequestSummary";
import HeadingText from "../../../components/Interface/HeadingText";
import PressableIcon from "../../../components/Interface/PressableIcon";
import PrimaryButton from "../../../components/Interface/PrimaryButton";
import SuccessModal from "../../../components/modals/SuccessModal";
import useCreateRequest from "../../../hooks/mutations/useCreateRequest";
import useUser from "../../../hooks/queries/useUser";
import { RequestServiceContext } from "../../../store/RequestServiceContext";
import { ServicesContext } from "../../../store/ServicesContextProvider";
import { currentUserDataObj } from "../../../types/api/currentUserDataObj";
import { ServiceRequestDataObj } from "../../../types/api/ServiceRequestDataObj";
import { ServiceCartContext } from "../../../store/ServiceCartContext";
import { PendingActionsContext } from "../../../store/PendingActionsContaxt";

export default function ServiceRequest({ navigation, route }) {
  const { width } = Dimensions.get("window");
  const { scrollEnabled } = useContext(PendingActionsContext);
  const [formStep, setFormStep] = useState(1);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const progressWidth = ((formStep * 22) / 100) * width;
  const { isLoading, mutateAsync, error, isSuccess } = useCreateRequest();
  const user = useUser();
  const userData = user.data as currentUserDataObj;

  const cartCtx = useContext(ServiceCartContext);
  const servicesCtx = useContext(ServicesContext);
  const { formValues, services } = useContext(RequestServiceContext);

  useLayoutEffect(() => {
    servicesCtx.hideTabBar();
  });

  //** Handles clicking next on forms */
  function onClickNext() {
    setFormStep((prev) => prev + 1);
  }

  //** Handles the back button */
  function handleBackButton() {
    formStep <= 1 ? navigation.goBack() : setFormStep((prev) => prev - 1);
  }

  //** Handles editing on  */
  function onClickEdit(step: number) {
    setFormStep(step);
  }

  //** Submit Handler */
  function submitRequestHandler() {
    const { eventDetails, others, rehearsals, otherDetails } = formValues;

    let OtherDetails = [];

    type Result = {
      name?: string;
      values?: string[];
    };

    for (const key in otherDetails) {
      if (Object.prototype.hasOwnProperty.call(otherDetails, key)) {
        const value = otherDetails[key];
        let result: Result = {};
        result.name = key;
        result.values = [value];
        OtherDetails.push(result);
      }
    }

    cartCtx.services.forEach((v, i) => {
      const postData: ServiceRequestDataObj = {
        ...eventDetails,
        ...rehearsals,
        ...others,
        budget: {
          type: others.budget.type,
          fixedPrice: others.budget.fixedPrice[i],
          range: others.budget.range[i],
        },
        userId: userData._id,
        status: "pending",
        category: v.id,
        title: v.name,
        otherDetails: OtherDetails,
      };

      console.log(postData);

      mutateAsync(postData)
        .then((r) => {
          setTimeout(() => {
            setIsSuccessful(true);
            cartCtx.clear();
          }, 1000);
        })
        .catch((e) => alert(e?.response?.data?.message));
    });
  }

  //** Conditionals */
  let form = <EventDetails onClickNext={onClickNext} />;

  switch (formStep) {
    case 2:
      form = <Rehearsals onClickNext={onClickNext} />;
      break;
    case 3:
      form = <OthersForm onClickNext={onClickNext} />;
      break;
    case 4:
      form = (
        <RequestSummary
          onClickSubmit={submitRequestHandler}
          onClickEdit={onClickEdit}
          isLoading={isLoading}
        />
      );
  }

  //** Return */
  return (
    <>
      {/* Modals */}
      <SuccessModal
        visible={isSuccessful}
        setVisibility={setIsSuccessful}
        message="We have submitted your request and it is processing. We will notify you when vendors apply for your gig"
        title="Request Submitted"
        CTA={
          <PrimaryButton
            onPress={() => navigation.navigate("Home")}
            title="Back Home"
            extraStyles={{ width: "100%" }}
          />
        }
      />

      {/* Top Section */}
      <View style={styles.top}>
        <PressableIcon
          icon={<Feather size={24} name="arrow-left" />}
          onPress={handleBackButton}
        />
        <HeadingText extraStyles={{ marginHorizontal: 12 }}>
          Service Request
        </HeadingText>
      </View>

      {/* ProgressBar */}
      <View style={[styles.progressBar, { width: progressWidth }]} />

      {/* Form */}
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: 60,
          backgroundColor: "#fff",
        }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.container}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"always"}
        >
          {form}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    marginHorizontal: 20,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  progressBar: {
    height: 2,
    backgroundColor: "#DE8E0E",
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
