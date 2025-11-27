import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";

export function FooterComponent(page) {
  const footer = El({
    element: "div",
    restAttrs: {
      class:
        "w-full h-[66px] bg-white  flex justify-around items-center fixed bottom-0 left-0 px-[20px] pb-[20px]",
    },
  });

  const footerItems = [
    {
      icon: "/assets/icons/home.png",
      icon_selected: "/assets/icons/home_selected.png",
      text: "Home",
      route: "/home",
    },
    {
      icon: "/assets/icons/cart.png",
      icon_selected: "/assets/icons/cart_selected.png",
      text: "Cart",
      route: "/cart",
    },
    {
      icon: "/assets/icons/order.png",
      icon_selected: "/assets/icons/home.png",
      text: "Orders",
      route: "/orders",
    },
    {
      icon: "/assets/icons/wallet.png",
      icon_selected: "/assets/icons/home.png",
      text: "Wallet",
      route: "/wallet",
    },
    {
      icon: "/assets/icons/profile.png",
      icon_selected: "/assets/icons/home.png",
      text: "Profile",
      route: "/profile",
    },
  ];

  footerItems.forEach((item) => {
    const navBtn = El({
      element: "div",
      restAttrs: {
        class:
          "flex flex-col items-center cursor-pointer text-center select-none  w-[24px] h-[24px]",
      },
    });
    navBtn.onclick = () => router.navigate(item.route);
    const imageSource = page === item.text ? item.icon_selected : item.icon;
    const icon = El({
      element: "img",
      restAttrs: { src: imageSource, class: "w-full h-full" },
    });

    const label = El({
      element: "div",
      restAttrs: {
        class:
          "mt-[4px] text-[10px] font-semibold text-[#152536] font-Inter leading-[100%]",
      },
      children: [item.text],
    });

    navBtn.append(icon);
    navBtn.append(label);
    footer.append(navBtn);
  });
  return footer;
}
