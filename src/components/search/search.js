import { El } from "../../utils/el.js";
import {
  debounce,
  loadRecentSearches,
  saveRecentSearch,
  clearAllRecent,
  removeRecent,
} from "../../utils/helpers.js";
import { getProductsAPI } from "../../utils/API.js";
import { ProductCard } from "../shared/productOverview.js";
import { checkToken } from "../../utils/helpers.js";

export function SearchComponent() {
  checkToken();

  const page = El({
    element: "div",
    restAttrs: { class: "w-full pb-20" },
  });

  // ----------------------------------------------
  // SEARCH INPUT
  const searchBox = El({
    element: "div",
    restAttrs: {
      class:
        "w-[380px] h-[47px] border-[1px] border-[#343A40] rounded-[8px] mt-[20px] mx-auto my-[5px] bg-[#FAFAFA] rounded-[4px] flex items-center px-[12px] gap-[8px]",
    },
  });

  const searchIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/search.png",
      class: "w-[16px] h-[16px]",
    },
  });

  const searchInput = El({
    element: "input",
    restAttrs: {
      type: "text",
      placeholder: "Search products...",
      class:
        "flex-1 bg-transparent outline-none text-[14px] font-Inter placeholder-[#BAB8BC]",
    },
  });
  searchBox.append(searchIcon, searchInput);
  page.append(searchBox);

  // ----------------------------------------------
  // RESULTS HEADER ( shows after search )
  const resultHeader = El({
    element: "div",
    restAttrs: {
      class: "hidden px-6 mt-4 flex justify-between items-center",
    },
    children: [
      El({
        element: "div",
        restAttrs: { class: "text-[#152536] font-semibold" },
        children: [""],
      }),
      El({
        element: "div",
        restAttrs: { class: "text-[#152536] font-semibold" },
        children: [""],
      }),
    ],
  });

  page.append(resultHeader);

  // ----------------------------------------------
  // RECENT SEARCH LIST
  const recentWrapper = El({
    element: "div",
    restAttrs: {
      class: "px-6 mt-4 flex flex-col gap-3",
    },
  });

  page.append(recentWrapper);

  function renderRecent() {
    recentWrapper.classList.remove("hidden");
    const recentHeader = El({
      element: "div",
      restAttrs: {
        class: "px-6 mt-4 flex justify-between items-center",
      },
      children: [
        El({
          element: "div",
          restAttrs: { class: "text-[#152536] font-semibold" },
          children: ["Recent"],
        }),
        El({
          element: "div",
          restAttrs: { class: "text-[#152536] font-semibold" },
          children: ["Clear All"],
          eventListener: [
            {
              event: "click",
              callback: () => {
                clearAllRecent();
                renderRecent();
              },
            },
          ],
        }),
      ],
    });

    recentWrapper.innerHTML = "";
    recentWrapper.append(recentHeader);
    const items = loadRecentSearches();

    if (items.length === 0) {
      recentWrapper.append(
        El({
          element: "div",
          children: ["No recent searches"],
          restAttrs: { class: "text-gray-400 text-sm mt-4 opacity-50" },
        })
      );
      return;
    }

    items.forEach((item) => {
      const row = El({
        element: "div",
        restAttrs: {
          class: "flex justify-between  p-3 cursor-pointer text-[15px]",
        },
        children: [
          El({
            element: "span",
            children: [item],
          }),
          El({
            element: "span",
            children: ["✕"],
            restAttrs: { class: "text-gray-500 cursor-pointer" },
            eventListener: [
              {
                event: "click",
                callback: (e) => {
                  e.stopPropagation();
                  removeRecent(item);
                  renderRecent();
                },
              },
            ],
          }),
        ],
        eventListener: [
          {
            event: "click",
            callback: () => {
              searchInput.value = item;
              doSearch(item);
            },
          },
        ],
      });

      recentWrapper.append(row);
    });
  }

  renderRecent();

  // ----------------------------------------------
  // PRODUCTS CONTAINER
  // ----------------------------------------------
  const productsContainer = El({
    element: "div",
    restAttrs: {
      class: "grid grid-cols-2 w-full gap-4 px-6 mt-6 mb-[100px]",
    },
  });

  page.append(productsContainer);

  let pageIndex = 1;
  let loading = false;
  let hasMore = true;
  let currentSearch = "";

  async function loadProducts() {
    if (loading || !hasMore) return;
    loading = true;

    const result = await getProductsAPI({
      search: currentSearch,
      page: pageIndex,
      limit: 10,
    });

    const products = result.data;
    const count = result.total;

    // update header
    resultHeader.classList.remove("hidden");
    resultHeader.children[0].innerHTML = `Results for "${currentSearch}"`;
    resultHeader.children[1].innerHTML = `${count} found`;

    if (!products || products.length === 0) {
      hasMore = false;
      showEmpty();
      loading = false;
      return;
    }

    products.forEach((p) => productsContainer.append(ProductCard(p)));

    if (products.length < 10) hasMore = false;

    pageIndex++;
    loading = false;
  }

  function resetProducts() {
    productsContainer.innerHTML = "";
    pageIndex = 1;
    hasMore = true;
  }

  function showEmpty() {
    productsContainer.innerHTML = "";
    productsContainer.append(
      El({
        element: "div",
        restAttrs: {
          class:
            "col-span-2 w-full  flex flex-col items-center justify-center text-center mt-10  ",
        },
        children: [
          El({
            element: "img",
            restAttrs: {
              src: "/assets/images/notfound.png",
              class: "w-[150px] h-[150px] opacity-70",
            },
          }),
          El({
            element: "div",
            children: ["Not Found"],
            restAttrs: { class: "font-semibold text-[#152536] mt-4" },
          }),
          El({
            element: "div",
            children: [
              "Sorry, the keyword you entered cannot be found. please check again or search with another keyword.",
            ],
            restAttrs: { class: "text-gray-500 px-[5px] mt-1 justify-center" },
          }),
        ],
      })
    );
  }

  // ----------------------------------------------
  // MAIN SEARCH LOGIC (with 3s debounce)
  const doSearch = debounce(async (value) => {
    currentSearch = value.trim();

    if (currentSearch === "") {
      resultHeader.classList.add("hidden");
      productsContainer.innerHTML = "";
      renderRecent();
      return;
    }

    // store in recent
    saveRecentSearch(currentSearch);
    recentWrapper.classList.add("hidden");

    resetProducts();
    await loadProducts();
  }, 3000);

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if (value === "") {
      resultHeader.classList.add("hidden");
    }
    doSearch(e.target.value);
  });

  // INFINITE SCROLL
  window.onscroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      loadProducts();
    }
  };

  return page;
}
