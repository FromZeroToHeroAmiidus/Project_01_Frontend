import React, { useState, useEffect } from "react";
import EurIconRender from "../assets/icons/EurIconRender";
import ClockIconRender from "../assets/icons/ClockIconRender";
import steamDeck from "../assets/images/mikrofon.jpg";
import ChangePassword from "./ChangePassword";
import ChangeAvatar from "./ChangeAvatar";
import * as API from "../api/Api";
import fullUserStore from "../stores/fullUser.store";
import { userFullStorage } from "../utils/localStorage";

interface FullUserInfoType {
  firstName: string;
  lastName: string;
  email: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettings: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<FullUserInfoType>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isFocusedPrice, setIsFocusedPrice] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);
  const [imageSet, setImageSet] = useState(true);
  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    changePassword: false,
    changeAvatar: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.retrieveUser();
        const userData = response.data;
        const mappedUser = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
        };
        setUser(mappedUser);
        fullUserStore.login(mappedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.editUser(user);
      alert("User updated successfully!");
      userFullStorage.setUser(user);
      // window.location.reload();
      onClose(); // Optionally close the modal after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const setImageStatus = () => {
    setImageSet(!imageSet);
  };

  const handleOpenModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
    onClose();
  };

  const handleCloseModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }));
  };

  if (!isOpen)
    return (
      <>
        <ChangePassword
          isOpen={modalState.changePassword}
          onClose={() => handleCloseModal("changePassword")}
        />
        <ChangeAvatar
          isOpen={modalState.changeAvatar}
          onClose={() => handleCloseModal("changeAvatar")}
        />
      </>
    );

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 mt-[10%]">
      <div className="bg-black opacity-30 fixed inset-0 z-0"></div>
      <div className="bg-white w-[533px] p-4 rounded-2xl z-50 flex flex-col gap-4">
        <form onSubmit={handleSubmit}>
          <div className="title text-2xl font-bold">Profile settings</div>
          <div className="inner flex flex-col gap-4">
            <div className="itemTitle flex gap-[17px]">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none w-full font-bold"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none w-full font-bold"
                />
              </div>
            </div>
            <div className="Desc flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={user.email}
                onChange={handleChange}
                className="flex-1 py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none font-bold"
              />
            </div>
            <div className="grid flex-col gap-4 font-bold">
              <button
                type="button"
                className="flex justify-start"
                onClick={() => handleOpenModal("changePassword")}
              >
                Change password
              </button>
              <button
                type="button"
                className="flex justify-start"
                onClick={() => handleOpenModal("changeAvatar")}
              >
                Change profile picture
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-2xl font-bold bg-[#EDF4F2] hover:bg-gray-300 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
