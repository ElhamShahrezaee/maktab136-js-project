import { createAuthPage } from "./authCreator.js";
import { signupAPI } from "../../utils/API.js";

export function SignUpComponent() {
  const page = createAuthPage({
    titleText: "Signup to Your Account",
    buttonText: "SignUp",
    switchText: "Login",
    switchRoute: "/auth/login",
    onSubmitAPI: signupAPI,
  });

  return page;
}
