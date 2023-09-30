import { createContext } from "react";

import { PopupDisplay } from "@/types/types";

export interface PopupContextType {
    popupDisplay: PopupDisplay;
    setPopupDisplay: (display: PopupDisplay) => void;
}

export const PopupContext = createContext<PopupContextType | null>(null);