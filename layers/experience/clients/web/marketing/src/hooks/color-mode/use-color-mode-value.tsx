import { useMemo } from "react";
import { useColorMode } from "./use-color-mode";

type UseColorModeValue = <LT = unknown, DT = unknown> (lightModeValue: LT, darkModeValue: DT) => LT | DT;

export const useColorModeValue: UseColorModeValue = (lightModeValue, darkModeValue) => {

  const { colorMode } = useColorMode();
  return useMemo(() => colorMode === "light" ? lightModeValue : darkModeValue, [colorMode]);

}