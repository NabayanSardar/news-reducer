import Cookies from "js-cookie";

export const forceLogout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  window.location.href = "/login";
};
