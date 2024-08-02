import authStore from "../../stores/auth.store";
import fullUserStore from "../../stores/fullUser.store";
import { logout, refresh } from "../../utils/authUtils";
import { userIdStorage } from "../../utils/localStorage";
import { setIsLoggedIn_ } from "../../utils/loginState";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const fukec = await logout();
      if (fukec === "Failure")
        // let's try refresh token :)
        await refresh();
      await logout(); // if fails both access and refresh are expired / not present thus login is req
      // zbrisem local
      authStore.signout();
      userIdStorage.clearUser();
      fullUserStore.signout();
      console.log("Uspesno odjavljen ... ");
      window.location.href = "/login"; // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
