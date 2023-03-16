import { readAsStringAsync } from "expo-file-system";
import { useState } from "react";

interface dataType {
  res: string;
  type: string;
}

export default function useConvertImage(imgUri: string) {
  const [data, setData] = useState<dataType>({
    res: "",
    type: "",
  });

  const [isReady, setIsReady] = useState(false);

  const typeArr = imgUri.split(".");
  const type = typeArr[typeArr.length - 1];

  async function readData() {
    readAsStringAsync(imgUri, { encoding: "base64" }).then((value) => {
      const parsed = {
        res: value,
        type,
      };
      setData(parsed);
      setIsReady(true);
    });
  }

  return { data, isReady, readData };
}
