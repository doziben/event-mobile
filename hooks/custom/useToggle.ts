import { useState } from "react";

type Result = [boolean, VoidFunction];

export default function useToggle() {
  const [state, setState] = useState(false);

  function toggle() {
    setState((p) => !p);
  }

  const result: Result = [state, toggle];

  return result;
}
