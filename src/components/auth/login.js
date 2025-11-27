import { createAuthPage } from "./authCreator.js";
import { loginAPI } from "../../utils/API.js";

export function LoginComponent() {
  const page = createAuthPage({
    titleText: "Login to Your Account",
    buttonText: "SignIn",
    switchText: "Signup",
    switchRoute: "/auth/signup",
    onSubmitAPI: loginAPI,
  });

  return page;
}
