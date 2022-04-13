import { atom } from "recoil";

export const ResultInfo = atom({
  key: "ResultInfo",
  default: {
    canSee: false,
    value: {
      disease: "",
      solutions: "",
    },
  },
});
