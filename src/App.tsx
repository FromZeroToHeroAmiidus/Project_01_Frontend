// Import necessary modules
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup/Signup";
import HomePage from "./pages/homePage/HomePage";
import Error404 from "./pages/errorPage/Error404";

import Navbar from "./components/navbar/Navbar";

import ProfileSettingsPage from "./settings/settingsPage/SettingsPage";

import authStore from "./stores/auth.store";

import "./index.css";
import AllAuctions from "./pages/auctions/AllAuctions";
import BiddingAuctions from "./pages/auctions/BiddingAuctions";
import MyAuctions from "./pages/auctions/MyAuctions";
import WonAuctions from "./pages/auctions/WonAuctions";
import AuctionItem from "./pages/auctions/AuctionItem";

import AddAuction from "./pages/auctions/addAuction/AddAuction";

import { observer } from "mobx-react";
import RetailLoginForm from "./pages/login_and_register/RetailLoginForm";
import RetailSignupForm from "./pages/login_and_register/RetailSignupForm";
import RetailForgotPasswordForm from "./pages/login_and_register/RetailForgotPasswordForm";
import RetailPasswordResetConfirmForm from "./pages/login_and_register/RetailPasswordResetConfirmForm";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // for title change when clicking navbar
  //const [title, setTitle] = useState("Default Title");

  const hideNavbarLogin = location.pathname === "/login";
  const hideNavbarRegister = location.pathname === "/signup";
  const hideForgotPassword = location.pathname === "/forgot-password";
  const hideResetPasswordConfirm = location.pathname === "/reset-password";
  //  const hideNavbarUserLandingPage = location.pathname === "/me/myauctions";

  // add auction
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    addAuction: false,
    profileSettings: false,
    miniSettings: false,
  });

  const handleOpenModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
  };

  const handleCloseModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }));
  };
  // add auction

  useEffect(() => {
    // This effect will run only once when the component mounts
    if (authStore.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // authStore.signout();
      // userIdStorage.clearUser();
      // fullUserStore.signout();
      // window.location.href = "/";
      // window.location.pathname = "/";
    }
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {}, [isLoggedIn]);

  const [activeTab, setActiveTab] = useState<
    "auctions" | "profile" | "unclicked"
  >("unclicked");

  // isLoggedIn ? setActiveTab("unclicked") : setActiveTab("auctions");

  return (
    <Router>
      <div>
        {!hideNavbarLogin &&
          !hideNavbarRegister &&
          !hideForgotPassword &&
          !hideResetPasswordConfirm && (
            // !hideNavbarUserLandingPage && (
            <Navbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenModal={handleOpenModal} // Pass the modal open handler to Navbar
            />
          )}
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <MyAuctions /> : <HomePage />}
          />
          <Route
            path="/user/settings"
            element={isLoggedIn ? <ProfileSettingsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <RetailLoginForm />}
          />{" "}
          <Route
            path="/forgot-password"
            element={
              isLoggedIn ? <Navigate to="/" /> : <RetailForgotPasswordForm />
            }
          />
          <Route
            path="/reset-password"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <RetailPasswordResetConfirmForm />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/me/myautions" />
              ) : (
                <RetailSignupForm />
              )
            }
          />
          <Route
            path="/auctions"
            element={isLoggedIn ? <AllAuctions /> : <Navigate to="/" />}
          />
          <Route
            path="/me/bidding"
            element={
              isLoggedIn ? (
                <>
                  {/* <Navbar activeTab={"profile"} setActiveTab={setActiveTab} onOpenModal={handleOpenModal}/> */}
                  <BiddingAuctions /> {/* <RetailSignup /> */}
                </>
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/me/myauctions"
            element={
              isLoggedIn ? (
                <>
                  {/* <Navbar activeTab={"profile"} setActiveTab={setActiveTab} onOpenModal={handleOpenModal}/> */}
                  <MyAuctions />
                  {/* <RetailPasswordReset /> */}
                </>
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/me/won"
            element={
              isLoggedIn ? (
                <>
                  {/* <Navbar activeTab={"profile"} setActiveTab={setActiveTab} onOpenModal={handleOpenModal}/> */}
                  <WonAuctions /> {/* <RetailLogin /> */}
                </>
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/auctions/:id/bid"
            element={isLoggedIn ? <AuctionItem /> : <HomePage />}
          />
          <Route
            path="/auctions/create"
            element={
              isLoggedIn ? (
                <AddAuction
                  isOpen={modalState.addAuction}
                  onClose={() => handleCloseModal("addAuction")}
                />
              ) : (
                <Signup />
              )
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <br />
      </div>
    </Router>
  );
};

export default observer(App);
