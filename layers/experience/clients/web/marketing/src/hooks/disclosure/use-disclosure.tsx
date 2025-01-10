import { useState } from "react";
import useStateProvidedDisclosure from "./use-state-provided-disclosure";

export default function useDisclosure(initial: boolean = false) {
  // useDisclosure, makes use of local react states
  const state = useState(initial);
  return useStateProvidedDisclosure(state);
}
