import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const locationCurrent = atom({
  key: "current",
  default: [],
  effects: [persistAtom],
});
