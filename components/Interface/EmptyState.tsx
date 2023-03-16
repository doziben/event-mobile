import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface EmptyStateProps {
  illustration: ReactNode;
  title: string;
  message?: string;
  CTA?: ReactNode;
}

export default function EmptyState({
  illustration,
  title,
  CTA,
  message,
}: EmptyStateProps) {
  return (
    <View style={styles.emptyView}>
      {illustration}
      <Text style={styles.headingText}>{title}</Text>
      <Text style={styles.bodyText}>{message}</Text>
      {CTA}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyView: {
    marginVertical: 32,
    textAlign: "center",
    alignItems: "center",
  },
  headingText: {
    marginTop: 16,
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  bodyText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
});
