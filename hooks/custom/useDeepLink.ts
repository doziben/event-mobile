import { useEffect } from "react";
import * as Linking from "expo-linking";

interface handler {
  url: string;
}
type handlerFunction = ({ url }: handler) => void;

export default function useDeepLink(onSuccess: handlerFunction, key: string) {
  useEffect(() => {
    Linking.addEventListener("url", onSuccess);

    return () => {
      Linking.addEventListener("url", onSuccess).remove();
    };
  }, []);

  const url = Linking.useURL();

  if (url && url?.includes(key)) {
    const res = Linking.parse(url);
    // console.log("Testing Linking", res);
  }
}
