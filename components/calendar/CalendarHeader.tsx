import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import DisplayType from "./DisplayType";
import Modal from "react-native-modal";
import ModalWrapper from "../../components/modals/ModalWrapper";
import ModalHeader from "../modals/ModalHeader";
import getMonth, { months } from "../../utils/GetMonth";
import {
  CalendarContext,
  DisplayType as CalendarDisplayType,
} from "../../store/CalendarContext";
import CalendarOption from "./CalendarOption";
import HeadingText from "../Interface/HeadingText";

interface CalendarHeaderProps {
  date: Date;
}

const views: CalendarDisplayType[] = ["Week", "Month"];

export default function CalendarHeader({ date }: CalendarHeaderProps) {
  const { setDisplay, display, setDate } = useContext(CalendarContext);
  const [modal, setModal] = useState<"view" | "month" | "none">("none");
  const month = `${getMonth(date.getMonth())} ${date.getFullYear()}`;
  const title = modal === "month" ? "Select Month" : "Select View";

  const changeView = modal === "view";
  const changeMonth = modal === "month";

  function close() {
    setModal("none");
  }

  return (
    <>
      {/* Options Modal */}
      <View>
        <Modal onBackdropPress={close} isVisible={modal !== "none"}>
          <ModalWrapper>
            <ModalHeader title={title} onClose={close} />

            <View style={styles.optionsWrapper}>
              {changeView &&
                views.map((v, i) => {
                  function handlePress() {
                    setDisplay(v);
                  }

                  return (
                    <CalendarOption
                      onPress={handlePress}
                      isActive={display === v}
                      key={v}
                    >
                      <HeadingText lg>{v}</HeadingText>
                    </CalendarOption>
                  );
                })}

              {changeMonth &&
                months.map((m, i) => {
                  function handlePress() {
                    const monthDate = new Date();
                    monthDate.setMonth(i);
                    setDate(monthDate);
                    setModal("none");
                  }
                  const active = getMonth(date.getMonth()) === m;

                  return (
                    <CalendarOption
                      onPress={handlePress}
                      isActive={active}
                      key={m}
                    >
                      <HeadingText lg>{m}</HeadingText>
                    </CalendarOption>
                  );
                })}
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {/* Main Header */}
      <View style={styles.filter}>
        <DisplayType text={month} onPress={() => setModal("month")} />
        {/* <DisplayType text={display} onPress={() => setModal("view")} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filter: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  optionsWrapper: {
    marginVertical: 16,
    width: "100%",
  },
});
