import { OnboardingPage } from "./pages/onboarding/onboarding.js";
import { LoginPage } from "./pages/auth/login.js";
import { SignupPage } from "./pages/auth/signup.js";
import { router } from "./utils/router";
import "../public/styles/style.css";

const app = document.getElementById("app");
const pageContainer = document.createElement("div");
app.appendChild(pageContainer);

router.addRoute("/onboarding", OnboardingPage);
router.addRoute("/home", OnboardingPage);
router.addRoute("/auth/login", LoginPage);
router.addRoute("/auth/signup", SignupPage);

router.init(pageContainer);
