import { truncateName } from "../../utils/helpers.js";
import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";


export function ProductCard(product) {
  return El({
    element: "div",
    restAttrs: { class: "w-[182px]" },
    eventListener: [
      {
        event: "click",
        callback: () => router.navigate(`/products/${product.id}`),
      },
    ],
    children: [
      El({
        element: "div",
        restAttrs: {
          class:
            "w-[182px] h-[182px] bg-[#F3F3F3] rounded-[24px] flex items-center justify-center",
        },
        children: [
          El({
            element: "img",
            restAttrs: {
              src: product.imageURL,
                alt: product.name,
              class: "w-[142px] h-[142px] object-contain",
            },
          }),
        ],
      }),
      El({
        element: "div",
        restAttrs: {
          class: "mt-3 font-bold text-[20px] text-[#152536] leading-none",
        },
        children: [truncateName(product.name)],
      }),
      El({
        element: "div",
        restAttrs: {
          class: "mt-2 font-semibold text-[16px] text-[#152536]",
        },
        children: [`$ ${product.price.toFixed(2)}`],
      }),
    ],
  });
}
