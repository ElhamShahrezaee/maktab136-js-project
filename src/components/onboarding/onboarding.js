import Swiper from "swiper";
import "swiper/css";
import { El } from "../../utils/el.js";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "../../utils/localstorage.js";
import { router } from "../../utils/router";
import { IsOnboardingShown } from "../../constants/params.js";
import { CreateSlide1 } from "./slide1.js";
import { CreateSlide2 } from "./slide2.js";
import { CreateSlide35 } from "./slides3_5.js";

export function initOnboarding() {
  if (getItemLocalStorage(IsOnboardingShown)) router.navigate("/home");

  const overlay = El({
    element: "div",
    restAttrs: {
      class:
        "fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]",
    },
  });

  const root = El({
    element: "div",
    restAttrs: {
      class:
        "w-[428px] h-[926px] bg-white  overflow-hidden shadow-2xl relative",
    },
  });

  const swiperEl = El({
    element: "div",
    restAttrs: { class: "swiper w-full h-full bg-white" },
  });

  const wrapper = El({
    element: "div",
    restAttrs: { class: "swiper-wrapper" },
  });

  const slide1 = CreateSlide1();
  const slide2 = CreateSlide2();
  const features = CreateSlide35();

  wrapper.append(
    slide1,
    slide2,
    features.feat3.slide,
    features.feat4.slide,
    features.feat5.slide
  );
  swiperEl.append(wrapper);
  root.append(swiperEl);
  overlay.append(root);
  document.body.append(overlay);

  // -------------------------------------------------------------
  // Swiper init
  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    allowTouchMove: true,
    speed: 400,
  });

  features.feat3.button.addEventListener("click", () => swiper.slideNext());
  features.feat4.button.addEventListener("click", () => swiper.slideNext());

  // Auto advance for slides 0 & 1
  function autoAdvance(index) {
    if (index === 0 || index === 1) {
      setTimeout(() => {
        if (swiper.activeIndex === index) swiper.slideNext();
      }, 5000);
    }
  }

  swiper.on("slideChange", () => {
    autoAdvance(swiper.activeIndex);
  });

  autoAdvance(0);
}
