import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export function HomeSearch() {
  const searchBox = El({
    element: "div",
    restAttrs: {
      class:
        "w-[380px] h-[37px] mx-auto my-[5px] bg-[#FAFAFA] rounded-[4px] flex items-center px-[12px] gap-[8px] cursor-pointer",
    },
  });

  searchBox.onclick = () => router.navigate("/search");

  const searchIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/search.png",
      class: "w-[16px] h-[16px]",
    },
  });

  const searchText = El({
    element: "div",
    restAttrs: {
      class: "text-[14px] font-normal leading-[150%] text-[#BAB8BC] font-Inter",
    },
    children: ["Search"],
  });

  searchBox.append(searchIcon);
  searchBox.append(searchText);
  return searchBox;
}
