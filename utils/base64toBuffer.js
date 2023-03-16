import { Buffer } from "buffer";

export default function base64ToBuffer(file) {
  const res = new Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  return res;
}
