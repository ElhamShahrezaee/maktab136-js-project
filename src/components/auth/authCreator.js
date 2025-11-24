import { El } from "../../utils/el.js";
import { router } from "../../utils/router.js";
let passOK = false;
let isPass = false;
export function createAuthPage({
  titleText,
  buttonText,
  switchText,
  switchRoute,
  onSubmitAPI,
}) {
  const page = El({
    element: "div",
    restAttrs: {
      class: "w-full min-h-screen flex flex-col items-center bg-white relative",
    },
  });

  const logo = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/login_icon.png",
      class: "w-[54px] h-[81px] mt-[132px] mx-auto",
    },
  });
  page.append(logo);

  //
  // TITLE
  //
  const title = El({
    element: "div",
    restAttrs: {
      class:
        "w-[342px] mt-[120px] text-center font-semibold text-[32px] text-[#152536]",
    },
    children: [titleText],
  });
  page.append(title);

  const wrapperBase =
    "w-[380px] h-[37px] rounded-[4px] bg-[#FAFAFA] flex items-center px-[12px] mt-6 gap-[4px]";
  const inputBase =
    "flex-1 outline-none font-medium text-[14px] leading-[150%] font-Inter text-black bg-[#FAFAFA]";

  const usernameWrapper = El({
    element: "div",
    restAttrs: { class: wrapperBase },
  });

  const usernameIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/username_icon.png",
      class: "w-[14px] h-[14px] object-contain opacity-80",
    },
  });

  const usernameInput = El({
    element: "input",
    restAttrs: {
      type: "email",
      placeholder: "Username",
      class: inputBase,
    },
  });

  usernameWrapper.append(usernameIcon, usernameInput);
  page.append(usernameWrapper);

  const passwordWrapper = El({
    element: "div",
    restAttrs: { class: wrapperBase },
  });

  const lockIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/password_icon.png",
      class: "w-[14px] h-[14px] object-contain opacity-80",
    },
  });

  const passwordInput = El({
    element: "input",
    restAttrs: {
      type: "password",
      placeholder: "Password",
      class: inputBase,
    },
  });

  const eyeIcon = El({
    element: "img",
    restAttrs: {
      src: "/assets/icons/password_hidden.png",
      class: "w-[14px] h-[14px] object-contain opacity-80 cursor-pointer",
    },
  });

  eyeIcon.onclick = () => {
    isPass = passwordInput.type === "password";
    passwordInput.type = isPass ? "text" : "password";
    eyeIcon.src = isPass
      ? "/assets/icons/password_show.png"
      : passOK
      ? "/assets/icons/password_hidden_valid.png"
      : "/assets/icons/password_hidden.png";
  };

  passwordWrapper.append(lockIcon, passwordInput, eyeIcon);
  page.append(passwordWrapper);

  const switchLink = El({
    element: "a",
    restAttrs: {
      class:
        "mt-4 text-[14px] font-medium font-Inter text-black leading-[150%] cursor-pointer text-center",
    },
    children: [switchText],
  });
  switchLink.onclick = () => router.navigate(switchRoute);

  page.append(switchLink);

  const button = El({
    element: "button",
    restAttrs: {
      class:
        "w-[380px] bg-[#212529] text-white rounded-[30px] font-semibold text-[16px] flex items-center justify-center opacity-65 mt-auto mb-[12px] py-[12px]",
      disabled: true,
    },
    children: [buttonText],
  });

  page.append(button);

  function validate() {
    const userOK = usernameInput.value.length > 5;
    passOK = passwordInput.value.length >= 6;

    usernameWrapper.style.border =
      usernameInput.value.length > 0 ? "2px solid black" : "1px solid #D9D9D9";

    passwordWrapper.style.border =
      passwordInput.value.length > 0 ? "2px solid black" : "1px solid #D9D9D9";

    usernameIcon.src = userOK
      ? "/assets/icons/username_icon_valid.png"
      : "/assets/icons/username_icon.png";

    lockIcon.src = passOK
      ? "/assets/icons/password_icon_valid.png"
      : "/assets/icons/password_icon.png";
    eyeIcon.src = isPass
      ? "/assets/icons/password_show.png"
      : passOK
      ? "/assets/icons/password_hidden_valid.png"
      : "/assets/icons/password_hidden.png";

    if (userOK && passOK) {
      button.disabled = false;
      button.classList.remove("opacity-65");
    } else {
      button.disabled = true;
      button.classList.add("opacity-65");
    }
  }

  usernameInput.oninput = validate;
  passwordInput.oninput = validate;
  button.onclick = async () => {
    try {
      await onSubmitAPI(usernameInput.value, passwordInput.value);
      router.navigate("/home");
    } catch (err) {
      alert(err.message ?? `${buttonText} error`);
    }
  };

  return page;
}
