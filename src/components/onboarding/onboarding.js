import Swiper from "swiper";
import "swiper/css";
import { El } from "../../utils/el.js";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "../../utils/localstorage.js";
import { router } from "../../utils/router";

import IsOnboardingShown from "../../constants/params.js";

export function initOnboarding(routerGoHome) {
  if (getItemLocalStorage(IsOnboardingShown)) router.navigate("/home");

  // Overlay
  const overlay = El({
    element: "div",
    restAttrs: {
      class:
        "fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]",
    },
  });

  // Main container (428x926)
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
  // -------------------------------------------------------------
  // Slide 1
  const slide1 = El({
    element: "div",
    restAttrs: {
      class: "swiper-slide relative w-full h-full bg-white",
      style: "overflow:visible;",
    },
  });

  const iconWrapper = El({
    element: "div",
    restAttrs: {
      style:
        "position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);width:231px;height:63px;display:flex;align-items:center;justify-content:center;z-index:10;pointer-events:none;",
    },
    children: [
      El({
        element: "img",
        restAttrs: {
          src: "/assets/images/onboarding1.png",
          alt: "App Icon",
          style: "width:100%;height:100%;object-fit:contain;display:block;",
        },
      }),
    ],
  });

  slide1.append(iconWrapper);

  const ring = El({
    element: "div",
    restAttrs: {
      id: "loading-ring",
      style:
        "position:absolute;" +
        "left:50%;bottom:117px;transform:translateX(-50%) rotate(0deg);" +
        "width:48px;height:48px;" +
        "border:4px solid #000;border-top-color:transparent;" +
        "border-radius:50%;" +
        "box-sizing:border-box;" +
        "pointer-events:none;z-index:50;",
    },
  });
  slide1.append(ring);

  (function rotateRing() {
    if (window._onboardingRingRAF)
      cancelAnimationFrame(window._onboardingRingRAF);

    let angle = 0;

    function step() {
      angle = (angle + 4) % 360;
      ring.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      window._onboardingRingRAF = requestAnimationFrame(step);
    }

    window._onboardingRingRAF = requestAnimationFrame(step);
  })();

  // -------------------------------------------------------------
  // Slide 2 
  const slide2 = El({
    element: "div",
    restAttrs: {
      class: "swiper-slide w-full h-full relative bg-cover bg-center",
      style: `
      background-image:
        linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%),
        url('/assets/images/onboarding2.png');
      background-size: cover;
      background-position: center;
    `,
    },
  });

  const textWelcome = El({
    element: "div",
    innerText: "Welcome to",
    restAttrs: {
      class: "absolute text-white",
      style: `
      width:229px;
      height:48px;
      top:629px;
      left:32px;
      opacity:1;

      font-family: Inter;
      font-weight:600;
      font-size:40px;
      line-height:100%;
      letter-spacing:0%;
    `,
    },
  });

  const handIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/onboarding_hand.png", 
      alt: "hand icon",
      class: "absolute",
      style: `
      width:36px;
      height:36px;
      top:635px;
      left:277px;
      opacity:1;
    `,
    },
  });

  const textShoea = El({
    element: "div",
    innerText: "Shoea",

    restAttrs: {
      class: "absolute text-white",
      style: `
      width:222px;
      height:87px;
      top:693px;
      left:32px;
      opacity:1;

      font-family: Inter;
      font-weight:700;
      font-size:72px;
      line-height:100%;
      letter-spacing:0%;
    `,
    },
  });


  const textDescription = El({
    element: "div",
          innerText:"The best sneakers & shoes e-commerse app of the century for your fashion needs!",
    restAttrs: {
      class: "absolute text-white",
      style: `
      width:364px;
      height:44px;
      top:808px;
      left:31px;
      opacity:1;

      font-family: Inter;
      font-weight:600;
      font-size:16px;
      line-height:22px;
      letter-spacing:0%;
    `,
    },
    children: [
      ,
    ],
  });

  // ─────────────────────────────────────────────
  // APPEND ALL
  // ─────────────────────────────────────────────
  slide2.append(textWelcome);
  slide2.append(handIcon);
  slide2.append(textShoea);
  slide2.append(textDescription);

  // -------------------------------------------------------------
  // Helper for slides 3–5
  // -------------------------------------------------------------
  function featureSlide(img, title, desc, step) {
    const slide = El({
      element: "div",
      restAttrs: {
        class:
          "swiper-slide flex flex-col w-full h-full bg-white items-center justify-start",
      },
    });

    const image = El({
      element: "img",
      restAttrs: {
        class: "w-full h-[46%] object-cover",
        src: img,
      },
    });

    const textBlock = El({
      element: "div",
      restAttrs: { class: "px-6 pt-6 text-center" },
    });

    textBlock.append(
      El({
        element: "div",
        restAttrs: { class: "text-xl font-bold mb-2" },
        children: [title],
      })
    );

    textBlock.append(
      El({
        element: "div",
        restAttrs: { class: "text-sm text-gray-500 mb-4" },
        children: [desc],
      })
    );

    const dots = El({
      element: "div",
      restAttrs: { class: "flex gap-2 justify-center mb-6" },
    });

    for (let i = 0; i < 3; i++) {
      dots.append(
        El({
          element: "div",
          restAttrs: {
            class:
              "transition-all " +
              (i === step
                ? "w-7 h-2 rounded-full bg-indigo-500"
                : "w-2 h-2 bg-gray-300 rounded-full"),
          },
        })
      );
    }

    const button = El({
      element: "button",
      restAttrs: {
        class:
          "mt-auto mb-10 mx-auto w-72 h-12 rounded-xl text-white font-bold bg-gradient-to-r from-indigo-600 to-cyan-400 shadow-lg active:scale-95 transition",
      },
      children: ["Next"],
    });

    slide.append(image);
    slide.append(textBlock);
    slide.append(dots);
    slide.append(button);

    return { slide, button };
  }

  const feat1 = featureSlide(
    "https://picsum.photos/428/400?random=2",
    "Stay Organized",
    "Track tasks and notes easily",
    0
  );

  const feat2 = featureSlide(
    "https://picsum.photos/428/400?random=3",
    "Collaborate",
    "Share your progress with others",
    1
  );

  const feat3 = featureSlide(
    "https://picsum.photos/428/400?random=4",
    "Achieve More",
    "Reach goals faster with insights",
    2
  );

  feat3.button.textContent = "Get Started";

  wrapper.append(slide1, slide2, feat1.slide, feat2.slide, feat3.slide);
  swiperEl.append(wrapper);
  root.append(swiperEl);
  overlay.append(root);
  document.body.append(overlay);

  // -------------------------------------------------------------
  // Swiper init
  // -------------------------------------------------------------
  // eslint-disable-next-line no-undef
  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
    allowTouchMove: true,
    speed: 400,
  });

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

  // -------------------------------------------------------------
  // Button handlers
  // -------------------------------------------------------------
  feat1.button.addEventListener("click", () => swiper.slideNext());
  feat2.button.addEventListener("click", () => swiper.slideNext());
  feat3.button.addEventListener("click", () => finish());

  function finish() {
    localStorage.setItem(STORAGE_KEY, "1");
    overlay.remove();
    if (routerGoHome) routerGoHome();
  }
}
