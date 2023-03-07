import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const location = atom({
  key: "location",
  default: {
    current: "",
    locationList: [
      {
        latitude: 37.4778,
        longitude: 126.9608,
      },
      {
        latitude: 37.4798,
        longitude: 126.9621,
      },
      {
        latitude: 37.4779,
        longitude: 126.964,
      },
      {
        latitude: 37.4764,
        longitude: 126.9638,
      },
    ],
  },
  effects: [persistAtom],
});
