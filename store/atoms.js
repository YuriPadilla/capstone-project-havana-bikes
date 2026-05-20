import { atom } from "jotai";

const inputDates = { from: "", until: "" };

export const inputDateAtom = atom(inputDates);
export const bookingConfirmationAtom = atom(null);
