import { NextRouter } from "next/router";
import { removeCookie } from "../cookies";

const handleLogout = (clearUser: () => void, router?: NextRouter) => {
  // Remove the token from storage
  removeCookie("jw-token");
  clearUser();

  // Redirect to the login page
  if (router) {
    router.push("/login");
  }
};

export { handleLogout };
