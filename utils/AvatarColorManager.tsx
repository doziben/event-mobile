import { useEffect } from "react";
import { getToken, saveToken } from "../api";
import getRandomColor from "../hooks/custom/getRandomColor";

export default function AvatarColorManager() {
  useEffect(() => {
    getToken("avatarColor").then((value) => {
      value < "" ? saveToken("avatarColor", getRandomColor()) : null;
    });
  });
  return <></>;
}
