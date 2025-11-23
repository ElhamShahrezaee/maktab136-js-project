import { featureSlide } from "./features.js";

export function CreateSlide35() {
  const feat1 = featureSlide(
    "/assets/images/onboarding3.png",
    "We provide high quality products just for you",
    0
  );

  const feat2 = featureSlide(
    "/assets/images/onboarding4.png",
    "Your satisfaction is our number one periority",
    1
  );

  const feat3 = featureSlide(
    "/assets/images/onboarding5.png",
    "Let’s fulfill your fashion needs with shoearight now!",
    2
  );

  feat3.button.textContent = "Get Started";

  return { feat1, feat2, feat3 };
}
