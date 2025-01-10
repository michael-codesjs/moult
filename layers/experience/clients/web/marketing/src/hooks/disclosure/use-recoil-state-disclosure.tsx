import { RecoilState, useRecoilState } from "recoil";
import useStateProvidedDisclosure from "./use-state-provided-disclosure";

export default function useRecoilStateDisclosure(atom: RecoilState<boolean>) {
  // useDisclosure but the state is written to a recoil atom you provide
  const state = useRecoilState(atom);
  return useStateProvidedDisclosure(state);
}
