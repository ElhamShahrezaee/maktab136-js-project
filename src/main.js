import { OnboardingPage } from "./pages/onboarding/onboarding.js";
import { LoginPage } from "./pages/auth/login.js";
import { SignupPage } from "./pages/auth/signup.js";
import { HomePage } from "./pages/home/home.js";
import { SearchPage } from "./pages/search/search.js";

import { router } from "./utils/router";
import "../public/styles/style.css";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/onboarding", OnboardingPage);
router.addRoute("/home", HomePage);
router.addRoute("/search", SearchPage);

router.addRoute("/auth/login", LoginPage);
router.addRoute("/auth/signup", SignupPage);

router.init(pageContainer);
