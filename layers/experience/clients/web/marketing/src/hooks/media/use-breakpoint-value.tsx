import { Breakpoints } from "../../types";
import { getNearestBreakPointValue } from "../../utilities/functions";
import useBreakpoint from "./use-breakpoint";

export default function useBreakpointValue<T = any>(values: Partial<Record<Breakpoints,T>>) : T | undefined {

  const breakpoint = useBreakpoint();
  return getNearestBreakPointValue(values,breakpoint)!;

}