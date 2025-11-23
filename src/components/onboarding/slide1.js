import { El } from "../../utils/el.js";

export function CreateSlide1() {
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
  return slide1;
}
