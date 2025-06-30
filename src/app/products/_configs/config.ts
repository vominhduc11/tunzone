import { Fragment } from "react";

// src/config/transitionConfig.ts
export function getCompareListTransition(compareList: unknown[]) {
  return {
    as: Fragment,
    show: compareList.length > 0,
    enter:     "transition ease-out duration-300",
    enterFrom: "opacity-0 scale-95",
    enterTo:   "opacity-100 scale-100",
    leave:     "transition ease-in duration-200",
    leaveFrom: "opacity-100 scale-100",
    leaveTo:   "opacity-0 scale-95",
  };
}
