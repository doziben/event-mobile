import { createContext } from "react";

export type UpgradeContextData = {
  upgrade: (plan: "premium" | "elite", interval?: "MONTHLY" | "YEARLY") => void;
  planPrices: any;
};

const UpgradeContext = createContext<UpgradeContextData>({
  upgrade: () => {},
  planPrices: {},
});
export default UpgradeContext;
