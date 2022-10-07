export const routes = [
  {
    path: "/react-app-1(.*)",
    component: "react-app-1",
    action: async () => {
      await import("react_app_1/web-components");
    },
  },
  {
    path: "/react-app-2(.*)",
    component: "react-app-2",
    action: async () => {
      await import("react_app_2/web-components");
    },
  },
  {
    path: "/vue-app-1(.*)",
    component: "vue-app-1",
    action: async () => {
      await import("vue_app_1/web-components");
    },
  },
  {
    path: "/vue-app-2(.*)",
    component: "vue-app-2",
    action: async () => {
      await import("vue_app_2/web-components");
    },
  },
  { path: "/", component: "pn-home" },
  { path: "(.*)", component: "pn-not-found" },
];
