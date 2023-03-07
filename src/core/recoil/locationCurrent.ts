import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const locationCurrent = atom({
  key: "current",
  default: {
    latitude: 0,
    longitude: 0,
  },
  effects: [persistAtom],
});
