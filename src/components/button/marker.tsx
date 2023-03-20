const convertIcon = {
  붕어빵: "/image/icons/Bungeobbang.svg",
  군고구마: "/image/icons/Sweetpotato.svg",
  타코야끼: "/image/icons/Tako.svg",
  군밤: "/image/icons/roasted chestnut.svg",
  호떡: "/image/icons/brown sugar pancake.svg",
  계란빵: "/image/icons/eggbread.svg",
  떡볶이: "/image/icons/_tteokbokki.svg",
  어묵: "/image/icons/fishcake.svg",
};

export const makeMarker = (storeInfo) => {
  return ` <div class="marker-card">
  <div class="marker">
  <img src="${convertIcon[storeInfo.type]}" alt="" /> ${storeInfo.title}
  </div>
  <div class="dummy"></div>
        </div>`;
};
