import localFont from "@next/font/local";
export const ggsans = localFont({
  src: [
    {
      path: "../assets/fonts/ggsans-Bold.woff2",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "/fonts/ggbold.ttf",
    //   weight: "700",
    //   style: "bold",
    // },
    // {
    //   path: "../../public/fonts/gg-sans-Medium.ttf",
    //   weight: "500",
    //   style: "medium",
    // },
    // {
    //   path: "../../public/fonts/gg-sans-SemiBold.ttf",
    //   weight: "600",
    //   style: "semibold",
    // },
  ],
  variable: "--sans",
});
