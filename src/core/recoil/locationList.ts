import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const locationList = atom({
  key: "list",
  default: [],
  effects: [persistAtom],
});
