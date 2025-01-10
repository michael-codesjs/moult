import { useEffect, useMemo, useState } from "react";
import { breakpoints as themeBreakpoints } from "../../utilities/constants";
import { sortedEntries, withinRange } from "../../utilities/functions";
import useWindowDimensions from "./use-window-dimensions";

/*
 * Returns the current breakpoint
 * const breakpoint = useBreakpoint(); // maybe === "base" || "sm" || "md" and so on
 */

type Breakpoints = keyof typeof themeBreakpoints;
type BreakpointsRanges = Record<Breakpoints, [number, number]>;
type BreakpointRangeObject = { breakpoint: Breakpoints, range: [number, number] };

export default function useBreakpoint(): Breakpoints {

  const breakpointEntries = useMemo(() => sortedEntries((themeBreakpoints)),[]);

  /* width range for breakpoints, like: { base: [0,420], sm: [421, 680] } and so on */
  const breakpointsRanges:BreakpointsRanges = useMemo(() => {
    const ranges: BreakpointsRanges = {} as BreakpointsRanges;
    breakpointEntries.forEach(([breakpoint, min], index) => {
      const nextBreakpoint = breakpointEntries[index+1];
      const max = nextBreakpoint ? nextBreakpoint[1] : Infinity; // == Infinity when is last breakpoint
      ranges[breakpoint as Breakpoints] = [min,max-1];
    });
    return ranges;
  }, [breakpointEntries]);

  const getBreakpoint = () => {
    let object:BreakpointRangeObject = { breakpoint: "base", range: [0, themeBreakpoints.sm] };
    for(const entry of breakpointEntries) {
      const breakpoint = entry[0] as Breakpoints;
      const range = breakpointsRanges[breakpoint];
      if(range && withinRange(window.innerWidth,range)) {
        object = { breakpoint, range };
        break;
      }

    }
    return object;
  }

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());
  const { width } = useWindowDimensions();

  useEffect(() => {

    if(!withinRange(width,breakpoint.range)) {
      setBreakpoint(getBreakpoint());
    }

  },[width,breakpoint.range]);

  return breakpoint.breakpoint;

}