import { El } from "../../utils/el.js";
import { store } from "../../utils/store.js";
import { getBrands } from "../../utils/API.js";
export function Brands() {
  const brandWrapper = El({
    element: "div",
    restAttrs: {
      class:
        "w-full flex gap-3 overflow-x-auto overflow-y-hidden px-6 mt-6 no-scrollbar items-center h-[54px]",
    },
  });

  store.setState("selectedBrand", "All");
  let brandsCache = []; // cache brands to avoid multiple API calls

  // RENDERING BRAND ITEMS
  function createBrandItem(name) {
    const isSelected = store.getState("selectedBrand") === name;

    // SELECTED
    const selectedClasses =
      "cursor-pointer whitespace-nowrap rounded-[25px] " +
      "border-2 border-[#343A40] bg-[#343A40] " +
      "px-[20px] py-[10px] font-semibold text-[16px] " +
      "text-white leading-none";

    // NON SELECTED
    const notSelectedClasses =
      "cursor-pointer whitespace-nowrap rounded-[25px] " +
      "border-2 border-[#343A40] bg-white " +
      "px-[20px] py-[10px] font-semibold text-[16px] " +
      "leading-none " +
      "text-[#343A40] bg-[#343A40] ";

    return El({
      element: "div",
      restAttrs: {
        class: isSelected ? selectedClasses : notSelectedClasses,
      },
      children: [name],
      eventListener: [
        {
          event: "click",
          callback: () => store.setState("selectedBrand", name),
        },
      ],
    });
  }

  function renderBrandList() {
    brandWrapper.innerHTML = ""; // clear
    const allItem = createBrandItem("All");
    brandWrapper.append(allItem);

    brandsCache.forEach((b) => brandWrapper.append(createBrandItem(b)));
  }

  getBrands().then((brands) => {
    brandsCache = brands;
    renderBrandList();
  });

  // Re-run rendering only on brand change (does NOT fetch again)
  store.subscribe("selectedBrand", renderBrandList);

  return brandWrapper;
}
