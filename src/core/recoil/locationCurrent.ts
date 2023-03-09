import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const locationCurrent = atom({
  key: "location-state",
  default: [],
});
