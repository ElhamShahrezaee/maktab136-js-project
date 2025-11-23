import { El } from "../../utils/el.js";

export function featureSlide(img, title, step) {
  const slide = El({
    element: "div",
    restAttrs: {
      class:
        "swiper-slide w-full h-full bg-white flex flex-col items-center mx-auto justify-start overflow-hidden",
    },
  });

  // IMAGE WRAPPER
  const imageWrapper = El({
    element: "div",
    restAttrs: {
      class: "relative w-full flex justify-center",
      style: `
        height:657px;
        margin-top:-55px;
      `,
    },
  });

  const image = El({
    element: "img",
    restAttrs: {
      src: img,
      class: "object-cover",
      style: `
        width:430px;
        height:657px;
      `,
    },
  });

  imageWrapper.append(image);


  const textBlock = El({
    element: "div",
    restAttrs: {
      class: "flex flex-col justify-center items-center text-center mx-auto",
      style: `
        width:380px;
        height:119px;
        margin-top:32px;
        font-family:Inter;
        font-size:32px;
        font-weight:600;
        line-height:100%;
        color:black;
      `,
    },
    children: [title],
  });


  const dots = El({
    element: "div",
    restAttrs: {
      class: "flex justify-center items-center w-full",
      style: `
        height:23px;
        margin-top:32px;
        gap:6px;
      `,
    },
  });

  for (let i = 0; i < 3; i++) {
    dots.append(
      El({
        element: "div",
        restAttrs: {
          style: `
            width:30px;
            height:3px;
            background:${i === step ? "#000000" : "rgba(0,0,0,0.5)"};
            transition:all .3s;
          `,
        },
      })
    );
  }


  const button = El({
    element: "button",
    restAttrs: {
      class: "text-white flex items-center justify-center mx-auto",
      style: `
        width:380px;
        height:47px;
        margin-top:32px;

        background:#212529;
        border-radius:30px;
        border:1px solid #212529;

        padding:12px 16px;
        font-family:Inter;
        font-size:16px;
        font-weight:600;
        line-height:21px;
      `,
    },
    children: ["Next"],
  });

  // Append all parts
  slide.append(imageWrapper);
  slide.append(textBlock);
  slide.append(dots);
  slide.append(button);

  return { slide, button };
}
