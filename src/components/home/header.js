import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";
import { getItemLocalStorage } from "../../utils/localstorage.js";
import { getTimeOfDay } from "../../utils/helpers.js";

export function HomeHeader() {
  const username = getItemLocalStorage("username") ?? "User";
  const topSection = El({
    element: "div",
    restAttrs: {
      class:
        " h-[80px] w-full flex justify-between items-start px-[24px] pt-[16px]",
    },
  });

  // Left
  const leftCol = El({
    element: "div",
    restAttrs: { class: "flex flex-col" },
  });

  const morningRow = El({
    element: "div",
    restAttrs: { class: "flex items-center gap-[6px]" },
    children: [
      El({
        element: "div",
        restAttrs: {
          class:
            "text-[#757475] font-medium text-[16px] leading-[100%] font-Inter",
        },
        children: ["Good "+getTimeOfDay()],
      }),
      El({
        element: "img",
        restAttrs: {
          src: "/assets/icons/onboarding_hand.png",
          class: "w-[18px] h-[18px]",
        },
      }),
    ],
  });

  // Username
  const usernameText = El({
    element: "div",
    restAttrs: {
      class:
        "text-[#152536] font-bold text-[16px] leading-[100%] mt-[8px] font-Inter",
    },
    children: [username],
  });

  leftCol.append(morningRow);
  leftCol.append(usernameText);

  // Right
  const rightIcons = El({
    element: "div",
    restAttrs: { class: "flex items-center gap-[12px] w-[64px] pt-[12px]" },
  });

  const icon1 = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/bell.png",
      class: "w-[24px] h-[24px] cursor-pointer",
    },
  });

  const icon2 = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/heart.png",
      class: "w-[24px] h-[24px] cursor-pointer",
    },
  });

  rightIcons.append(icon1);
  rightIcons.append(icon2);

  topSection.append(leftCol);
  topSection.append(rightIcons);
  return topSection;
}
