import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { sidePanelDidRenderAtom } from "../data/atoms";
import { Breakpoints } from "../types";
import { breakpoints } from "../utilities/constants";

export function useSidePanel(breakpoint: Breakpoints) {
  // will cause a re-render of the component using it on larger devices when the side-panel is rendered & ready to be used as a portal.

  const sidePanelDidRender = useRecoilValue(sidePanelDidRenderAtom);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth > breakpoints[breakpoint];
    if (isDesktop && sidePanelDidRender) {
      setRendered(true);
    }
  }, [sidePanelDidRender, breakpoint]);

  return rendered;
}
