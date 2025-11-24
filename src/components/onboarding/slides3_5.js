import { featureSlide } from "./features.js";
import {IsOnboardingShown} from "../../constants/params.js";
import { router } from "../../utils/router";

export function CreateSlide35() {
  const feat3 = featureSlide(
    "/assets/images/onboarding3.png",
    "We provide high quality products just for you",
    0
  );

  const feat4 = featureSlide(
    "/assets/images/onboarding4.png",
    "Your satisfaction is our number one periority",
    1
  );

  const feat5 = featureSlide(
    "/assets/images/onboarding5.png",
    "Let’s fulfill your fashion needs with shoearight now!",
    2
  );

  feat5.button.textContent = "Get Started";
  feat5.button.addEventListener("click", () => finish());

  function finish() {
    setItemLocalStorage(IsOnboardingShown, true);
    router.navigate("/home");
  }

  return { feat3, feat4, feat5 };
}
