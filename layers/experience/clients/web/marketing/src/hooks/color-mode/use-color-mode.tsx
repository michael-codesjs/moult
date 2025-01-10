import { useRecoilState } from "recoil";
import { colorModeAtom } from "@data/atoms";
import { ColorMode } from "@typings";

type UseColorMode = () => {
  colorMode: ColorMode,
  toggleColorMode: () => void
}

export const useColorMode: UseColorMode = () => {

  const [colorMode, setColorMode] = useRecoilState(colorModeAtom);
  const toggleColorMode = () => setColorMode((value: ColorMode) => value !== "light" ? "light" : "dark");

  return {
    colorMode,
    toggleColorMode
  };

}