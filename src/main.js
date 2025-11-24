import { initOnboarding } from "./components/onboarding/onboarding.js";
import { LoginPage } from "./components/auth/login.js";
import { SignUpPage } from "./components/auth/signup.js";
import { router } from "./utils/router";
import "../public/styles/style.css";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/onboarding", initOnboarding);
router.addRoute("/home", initOnboarding);
router.addRoute("/auth/login", LoginPage);
router.addRoute("/auth/signup", SignUpPage);

router.init(pageContainer);
