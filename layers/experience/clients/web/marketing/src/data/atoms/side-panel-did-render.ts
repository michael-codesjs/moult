import { atom } from "recoil";

export const sidePanelDidRenderAtom = atom<boolean>({
  key: "side-panel-portal-container",
  default: false
});