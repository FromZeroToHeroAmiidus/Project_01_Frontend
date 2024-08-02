// Navbar.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserData } from "../../models/cookieDTO";
import { checkAuthentication } from "../../utils/authUtils";
import { setIsLoggedIn_, getIsLoggedIn } from "../.././utils/loginState";

import authStore from "../../stores/auth.store";

import Amacar from "../assets/images/amacar.jpg";

import AuctionIconRender from "../../assets/icons/AuctionIconRender";
import ProfileIconRender from "../../assets/icons/ProfileIconRender";

import logo from "../../assets/images/logo.png";
import krizecIcon from "../../assets/icons/krizec-icon.png";
import Title from "./Title";
import ContentBar from "./ContentBar";
import fullUserStore from "../../stores/fullUser.store";
import MiniSettings from "../../settings/MiniSettings";
import AddAuction from "../../pages/auctions/addAuction/AddAuction";
import Avatar from "../avatar/Avatar";
import avatarStore from "../../stores/avatarStore";

import { observer } from "mobx-react";
import { userIdStorage } from "../../utils/localStorage";

interface NavbarProps {
  activeTab: "auctions" | "profile" | "unclicked";
  setActiveTab: (tab: "auctions" | "profile" | "unclicked") => void;
  onOpenModal: (modalName: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn());

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

  // da odprem mini end

  useEffect(() => {
    if (authStore.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (
      activeTab === "unclicked" &&
      !window.location.pathname.startsWith("/auctions/")
    )
      setActiveTab("profile");
    //alert(window.location.pathname);
  }, []);

  return (
    <>
      <header className="bg-background flex justify-between py-5 px-8 max-w-1440 mx-auto">
        {authStore.user ? (
          <>
            <div className="flex justify-between items-center w-auto gap-4">
              <div className="bg-logoYellow rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
                <img className="max-w-none" src={logo} alt="logo.png" />
              </div>
              <div className="flex max-h-16 p-1 rounded-full bg-white">
                <Link to="/auctions">
                  <button
                    className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
                      activeTab === "auctions"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:cursor-default"
                    }`}
                    onClick={() => setActiveTab("auctions")}
                  >
                    <AuctionIconRender
                      fill={`${activeTab === "profile" ? "black" : "white"}`}
                    />
                    <span>Auctions</span>
                  </button>
                </Link>
                <Link to="/me/myauctions">
                  <button
                    className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ml-2 ${
                      activeTab === "profile"
                        ? "bg-black text-white"
                        : "bg-white text-black hover:cursor-default"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <ProfileIconRender
                      fill={`${activeTab === "profile" ? "white" : "black"}`}
                    />
                    <span>Profile</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative flex max-h-16 p-1 rounded-full bg-white gap-2 justify-between items-center w-auto">
              <button
                className="bg-logoYellow rounded-full w-14 h-14 flex items-center justify-center overflow-hidden hover:bg-addAuctionHover"
                onClick={() => handleOpenModal("addAuction")}
              >
                <img className="max-w-none" src={krizecIcon} alt="krizec.png" />
              </button>

              <button onClick={() => handleOpenModal("miniSettings")}>
                {/* <AvatarRender image={DefaultAvatar} /> */}
                <Avatar />
              </button>
              <MiniSettings
                isOpen={modalState.miniSettings}
                onClose={() => handleCloseModal("miniSettings")}
              />
              <AddAuction
                isOpen={modalState.addAuction}
                onClose={() => handleCloseModal("addAuction")}
              />
            </div>
          </>
        ) : (
          <>
            <div className="bg-logoYellow rounded-full w-16 h-16 flex items-center justify-center overflow-hidden">
              <img className="max-w-none" src={logo} alt="logo.png" />
            </div>

            <div className="flex items-center  gap-2">
              <div>
                <button
                  className="font-bold"
                  onClick={() => (window.location.href = "/login")}
                >
                  Log in
                </button>
              </div>

              <div className="">or</div>

              <button
                className="bg-black text-white rounded-2xl  py-2 px-4"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </header>
      {authStore.user ? (
        <>
          {activeTab === "unclicked" ? (
            <></>
          ) : (
            <>
              {activeTab === "auctions" ? (
                <Title title="Auctions" name="" />
              ) : (
                <Title
                  title=""
                  name={
                    fullUserStore
                      ? // ? `${fullUserStore.user?.firstName} ${fullUserStore.user?.lastName}`
                        `${fullUserStore.fullname().firstName} ${
                          fullUserStore.fullname().lastName
                        }`
                      : "Jabari"
                  }
                />
              )}
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {authStore.user ? (
        <>
          {activeTab === "profile" ? (
            <>
              <ContentBar />
            </>
          ) : (
            <>{/* not clicked profile */}</>
          )}
        </>
      ) : (
        <>{/* not active user */}</>
      )}
    </>
  );
};

export default observer(Navbar);
