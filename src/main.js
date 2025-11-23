import { initOnboarding } from "./components/onboarding/onboarding.js";
import { router } from "./utils/router";
import "../public/styles/style.css";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);
router.addRoute("/onboarding", initOnboarding);
router.addRoute("/home", initOnboarding);
router.init(pageContainer);
