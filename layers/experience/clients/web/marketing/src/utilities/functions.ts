import { Breakpoints, ColorMode, Season } from "@typings";
import { breakpointKeys } from "./constants";

export const changeColorMode = (value: ColorMode) => {
  const root = document.documentElement;
  value === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
}

export const isLiteralObject = (obj: any): obj is Object => {
	return (!!obj) && (obj.constructor === Object);
};

export function unStringfy<T>(jsonString: string): T | null {
  try {
    const object = JSON.parse(jsonString) as T;
    return object;
  } catch (error) {
    return null;
  }
}

export const withinRange = (number: number, range: [number, number]) => number >= range[0] && number <= range[1];

export const sortedEntries = <T = any>(obj: { [k: string]: T }): Array<[string, T]> => {
  /* Object.entries but the entries are sorted in the order in which they were inserted */
  return Object.keys(obj)
    .map(key => [key, obj[key]]);
}

export const intersection = <T = any>(array1: Array<T>, array2: Array<T>) => array1.filter(key => array2.includes(key));

export const getNearestBreakPointValue = <T = any>(values: Partial<Record<Breakpoints, T>>, breakpoint: Breakpoints): T | undefined => {
  /* Returns nearest breakpoint value if one does not exist for the desired breakpoint */
  if (breakpoint in values) return values[breakpoint]!; // value exists :)
  let index = breakpointKeys.indexOf(breakpoint);
  while (index >= 0) { // look for nearest value below desired breakpoint
    const key = breakpointKeys[index];
    if (key in values) break;
    index -= 1;
  }
  return values[breakpointKeys[index] as Breakpoints] as T;
}

export const getCurrentSeason = (): Season => {

  const now = new Date();
  const month = now.getMonth() + 1;

  return (
    month > 3 && month < 6 ? 'SPRING' :
      month > 6 && month < 9 ? 'SUMMER' :
        month > 9 && month < 12 ? 'FALL' :
          'WINTER' // default
  );
}