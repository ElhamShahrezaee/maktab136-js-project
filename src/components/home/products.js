import { El } from "../../utils/el.js";
import { Brands } from "./brands.js";
import { store } from "../../utils/store.js";
import { getProductsAPI } from "../../utils/API.js";
import { ProductCard } from "../shared/productOverview.js";

export function HomeProducts() {
  const page = El({
    element: "div",
    restAttrs: {
      class: "w-full min-h-screen bg-white flex flex-col",
    },
  });
  // ================================================================
  // HEADER

  const header = El({
    element: "div",
    restAttrs: {
      class: "w-full flex justify-between items-center mt-6 px-6",
    },
  });

  const title = El({
    element: "div",
    restAttrs: {
      class: "font-semibold text-[20px] text-[#152536]",
    },
    children: ["Most Popular"],
  });

  const seeAll = El({
    element: "div",
    restAttrs: {
      class: "font-semibold text-[16px] text-[#152536] cursor-pointer",
    },
    children: ["See All"],
  });

  header.append(title);
  header.append(seeAll);
  page.append(header);
  page.append(Brands());

  // ================================================================
  // BRAND LIST WRAPPER
  const productsContainer = El({
    element: "div",
    restAttrs: {
      class: "grid grid-cols-2 gap-4 px-6 mt-6  mb-[100px]",
    },
  });

  page.append(productsContainer);

  let pageIndex = 1;
  let loading = false;
  let hasMore = true;

  async function loadProducts() {
    if (loading || !hasMore) return;
    loading = true;

    const brand = store.getState("selectedBrand");
    const brandParam = brand === "All" ? "" : brand;

    const result = await getProductsAPI({
      brand: brandParam,
      page: pageIndex,
      limit: 10,
    });

    const products = result.data;

    // Always ensure it's an array
    if (!products || !Array.isArray(products) || products.length === 0) {
      hasMore = false;
      return;
    }

    if (products.length < 10) hasMore = false;

    products.forEach((p) => {
      productsContainer.append(ProductCard(p));
    });

    pageIndex++;
    loading = false;
  }

  function resetProducts() {
    productsContainer.innerHTML = "";
    pageIndex = 1;
    hasMore = true;
    loadProducts();
  }

  // Reload product list when selectedBrand changes
  store.subscribe("selectedBrand", resetProducts);

  // INITIAL LOAD
  resetProducts();

  // INFINITE SCROLL
  window.onscroll = () => {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (bottomReached) loadProducts();
  };

  return page;
}
