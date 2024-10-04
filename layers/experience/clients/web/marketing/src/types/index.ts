import { breakpoints } from "../utilities/constants";

export type ColorMode = "light" | "dark";
export type Season = "SPRING" | "WINTER" | "SUMMER" | "FALL";
export type Breakpoints = keyof typeof breakpoints;