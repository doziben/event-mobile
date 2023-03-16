import { memo, useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import useUser from "../../hooks/queries/useUser";
import { AuthContext } from "../../store/AuthContext";
import HeadingText from "../Interface/HeadingText";
import ModalHeader from "../modals/ModalHeader";
import ModalWrapper from "../modals/ModalWrapper";
import useStripeConnect from "../../hooks/queries/payments/useStripeConnect";
import FormDropDown, { FormDropDownProps } from "../Interface/FormDropDown";
import FormTextInput from "../Interface/FormTextInput";
import PrimaryButton from "../Interface/PrimaryButton";
import * as Linking from "expo-linking";
import useDeepLink from "../../hooks/custom/useDeepLink";
import useStripeWithdrawal from "../../hooks/mutations/payments/useStripeWithdrawal";
import { flutterwaveCurrencies } from "../../data/flutterwave";
import useBanks from "../../hooks/queries/payments/useBanks";
import useFlwWithdrawal from "../../hooks/mutations/payments/useFlwWithdrawal";
import { openAuthSessionAsync, dismissAuthSession } from "expo-web-browser";
import { DevSettings } from "react-native";
import LoadingComp from "../Interface/LoadingComp";
import useStripeAccount from "../../hooks/queries/payments/useStripeAccount";
import useUpdateUser from "../../hooks/mutations/useUpdateUser";

interface BalanceCardProps {
  navigation?: any;
  hideWithdraw?: boolean;
  defaultWallet?: string;
}

function BalanceCard({
  navigation,
  hideWithdraw,
  defaultWallet,
}: BalanceCardProps) {
  const { data: userData, refetch } = useUser();
  const updateUser = useUpdateUser();
  const { mutate, isLoading: stripeLoading } = useStripeWithdrawal();
  const { mutate: mutateFlw, isLoading: flwLoading } = useFlwWithdrawal();
  const { data: stripeAccData } = useStripeAccount(userData?._id);

  const wallet = userData?.wallet;

  const redirectUrl = Linking.createURL("stripe-status");
  const {
    isLoading,
    data,
    mutate: mutateStripeConnect,
    error,
  } = useStripeConnect(redirectUrl);

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isStripeWithdrawal, setIsStripeWithdrawal] = useState(false);
  const { userState } = useContext(AuthContext);
  const isVendor = userState === "vendor";

  const currencies =
    typeof wallet === "object" &&
    (defaultWallet
      ? Object?.keys(wallet).filter((w) => w === defaultWallet)
      : Object?.keys(wallet));

  useDeepLink(({ url }) => {
    // console.log("useDeeplink Callback", url);
  }, "stripe-status");

  useEffect(() => {
    refetch();
  });

  const [stripeAmount, setStripeAmount] = useState(0);

  const [currency, setCurrency] = useState(
    Array.isArray(currencies) && currencies[0]
  );
  const [formData, setFormData] = useState({
    account_bank: "",
    amount: 0,
    account_number: "",
    currency,
  });

  const { data: banksData } = useBanks(
    typeof currency === "string" ? currency?.substring(0, 2) : ""
  );
  const banks = banksData?.data;

  const bankOptions: FormDropDownProps["options"] =
    banks &&
    banks
      ?.map((bank) => ({ label: bank?.name, value: bank?.code }))
      .sort((a, b) => a.label.localeCompare(b.label));

  function updateFormData(key: string, value: string | number) {
    setFormData((p) => ({ ...p, [key]: value }));
  }

  function toggleWithdrawing() {
    setIsWithdrawing((p) => !p);
  }

  function toggleStripeWithdrawal() {
    setIsStripeWithdrawal((p) => !p);
  }

  function handleStripe() {
    mutate(
      {
        amount: stripeAmount,
        currency: "GBP",
        destination: userData.stripeId,
        paymentType: "PAYOUT",
        phone: userData.phone,
        trx_ref: `${userData?._id}_${Date.now()}`,
      },
      {
        onSuccess: (d) => {
          toggleStripeWithdrawal();
          console.log(d);

          alert("Withdrawal Successful!");
          refetch();
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  function handleFlutterwave() {
    mutateFlw(
      { ...formData, currency, reference: `${userData?._id}_${Date.now()}` },
      {
        onSuccess: (e) => {
          Alert.alert(e?.status, e?.message);
          toggleWithdrawing();
          refetch();
        },
        onError: (e: any) => alert(e?.response?.data?.message),
      }
    );
  }

  async function withdraw() {
    mutateStripeConnect();
    //* Stripe Withdrawal */
    if (currency === "stripe" && data) {
      stripeAccData?.payouts_enabled
        ? toggleStripeWithdrawal()
        : openAuthSessionAsync(data?.url, redirectUrl).then((result: any) => {
            // Unsuccessful Outcome
            if (result.type !== "success") {
              dismissAuthSession();
              DevSettings.reload();
              return;
            }

            // then update the user and stuff
            if (stripeAccData?.payouts_enabled) {
              updateUser.mutate({
                stripeConnected: true,
              });

              Alert.alert(
                "Stripe Wallet Connected!",
                "Your Stripe wallet has been successfully connected, you can now withdraw!",
                [{ text: "Ok, Proceed", onPress: toggleStripeWithdrawal }]
              );
            } else {
              Alert.alert(
                "Stripe Connection Failed",
                "Uh-oh, we were unable to connect to your stripe account. Do you want to retru this process?",
                [
                  {
                    text: "No, Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Yes, Retry",
                    onPress: withdraw,
                  },
                ]
              );
            }
          });
      return;
    }
    //* Withdrawal supported by flutterwave */
    if (flutterwaveCurrencies.includes(currency)) {
      toggleWithdrawing();
      return;
    }
  }

  return (
    <>
      {/* Withdrawal Modal */}
      <View>
        <Modal
          isVisible={isWithdrawing || isStripeWithdrawal}
          onBackdropPress={
            isWithdrawing ? toggleWithdrawing : toggleStripeWithdrawal
          }
        >
          <ModalWrapper>
            <ModalHeader
              title="Withdraw"
              onClose={
                isWithdrawing ? toggleWithdrawing : toggleStripeWithdrawal
              }
              extraStyles={{ marginBottom: 16 }}
            />
            <View style={{ width: "100%" }}>
              {/* Flutterwave Withdrawal */}
              {isWithdrawing && (
                <>
                  {banksData && (
                    <FormDropDown
                      label="Bank"
                      placeholder="Select Bank"
                      options={bankOptions}
                      onChangeValue={(value: string) =>
                        updateFormData("account_bank", value)
                      }
                    />
                  )}
                  <FormTextInput
                    label="Amount"
                    placeholder="Amount"
                    extraInputOptions={{ keyboardType: "number-pad" }}
                    onChangeText={(t) => updateFormData("amount", parseInt(t))}
                    tag={currency}
                    hasTag
                  />
                  <FormTextInput
                    label="Account Number"
                    placeholder="Account Number"
                    extraInputOptions={{ keyboardType: "number-pad" }}
                    onChangeText={(t) =>
                      updateFormData("account_number", parseInt(t))
                    }
                  />
                  <PrimaryButton
                    title="Withdraw"
                    isLoading={flwLoading}
                    onPress={handleFlutterwave}
                  />
                </>
              )}

              {/* Stripe Withdrawal */}
              {isStripeWithdrawal && (
                <>
                  <FormTextInput
                    label="Amount"
                    placeholder="Amount"
                    extraInputOptions={{ keyboardType: "number-pad" }}
                    onChangeText={(t) => setStripeAmount(parseInt(t))}
                    tag={"GBP"}
                    hasTag
                  />
                  <PrimaryButton
                    title="Withdraw"
                    onPress={handleStripe}
                    isLoading={stripeLoading}
                  />
                </>
              )}
            </View>
          </ModalWrapper>
        </Modal>
      </View>

      {(isLoading || updateUser.isLoading) && <LoadingComp />}

      {/* Wallet Component */}
      <ImageBackground
        style={styles.wallet}
        source={require("../../assets/app-media/storefrontbg.png")}
      >
        <View style={styles.wrapper}>
          <View style={styles.currencyWrapper}>
            <Text style={styles.bodyText}>
              {currency === "stripe" ? "GBP" : currency}{" "}
            </Text>
            {wallet && (
              <HeadingText extraStyles={styles.balanceText}>
                {wallet[currency]}
              </HeadingText>
            )}
          </View>
          <Text style={styles.bodyText}>Wallet Balance</Text>
        </View>

        {/* Multi Currency Toggler */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.multiWrapper}
          horizontal={true}
          data={currencies}
          renderItem={({ item, index }) => {
            const isActive = currency === item;
            const isLast = index === currencies?.length - 1;

            return (
              <TouchableOpacity
                onPress={() => setCurrency(item)}
                style={[
                  styles.box,
                  isActive ? styles.active : styles.inactive,
                  !isLast && { marginRight: 8 },
                ]}
              >
                <Text style={styles.boxText}>
                  {item === "stripe" ? "GBP" : item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
        />

        {/* Withdraw button */}
        {isVendor && !hideWithdraw && (
          <TouchableOpacity onPress={withdraw} style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>
              {currency === "stripe" && !stripeAccData?.payouts_enabled
                ? "Connect Wallet"
                : "Withdraw"}
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </>
  );
}

export default memo(BalanceCard);

const styles = StyleSheet.create({
  wallet: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#DE8E0E",
    borderRadius: 10,
    elevation: 1,
    marginVertical: 15,
  },
  withdrawButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  balanceText: {
    color: "white",
  },
  box: {
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  active: {
    backgroundColor: "#000000",
  },
  inactive: {
    backgroundColor: "#E5A53E",
  },
  multiWrapper: {
    marginVertical: 12,
  },
  bodyText: {
    fontSize: 16,
    color: "whitesmoke",
    fontFamily: "OpenSansSemiBold",
    lineHeight: 18,
  },
  wrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  withdrawText: {
    fontSize: 14,
    color: "#DE8E0E",
    fontFamily: "OpenSansSemiBold",
    lineHeight: 24,
  },
  boxText: {
    fontSize: 14,
    fontFamily: "OpenSansSemiBold",
    color: "#fff",
  },
  currencyWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
