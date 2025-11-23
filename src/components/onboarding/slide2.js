import { El } from "../../utils/el.js";

export function CreateSlide2() {

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
      innerText:
        "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
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
      children: [,],
    });

    // ─────────────────────────────────────────────
    // APPEND ALL
    // ─────────────────────────────────────────────
    slide2.append(textWelcome);
    slide2.append(handIcon);
    slide2.append(textShoea);
    slide2.append(textDescription);
    return slide2;
}