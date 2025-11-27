import { checkToken } from "../../utils/helpers.js";
import { El } from "../../utils/el.js";
import { HomeHeader } from "./header.js";
import { FooterComponent } from "../shared/footer.js";
import { HomeProducts } from "./products.js";
import { HomeSearch } from "./search.js";
export function HomeComponent() {
  checkToken();
  const page = El({
    element: "div",
    restAttrs: {
      class: "w-full min-h-screen bg-white flex flex-col",
    },
  });
  page.append(HomeHeader());
  page.append(HomeSearch());
  page.append(HomeProducts());
  page.append(FooterComponent("Home"));
  return page;
}
