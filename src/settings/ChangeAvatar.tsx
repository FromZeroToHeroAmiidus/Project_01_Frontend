import React, { useState } from "react";
import AvatarRender from "../assets/images/AvatarRender";
import DefaultAvatar from "../assets/images/default_avatar.png";
import Avatar from "../components/avatar/Avatar";
import * as API from "../api/Api";
import avatarStore from "../stores/avatarStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeAvatar: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(DefaultAvatar);
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>("red");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        // 3 MB
        setMessage("Please keep your picture within 250x250px and under 3MB.");
        setMessageColor("red");
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (img.width > 250 || img.height > 250) {
          setMessage(
            "Please keep your picture within 250x250px and under 3MB."
          );
          setMessageColor("red");
        } else {
          setSelectedFile(file);
          setPreviewUrl(URL.createObjectURL(file));
          setMessage(null);
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a picture to upload.");
      setMessageColor("red");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      await API.changeProfilePicture(formData);
      await avatarStore.refreshAvatar();
      setMessage("You successfully changed your profile picture.");
      setMessageColor("green");
    } catch (error) {
      setMessage("There was an error uploading your picture.");
      setMessageColor("red");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 mt-[10%]">
      <div className="bg-black opacity-30 fixed inset-0 z-0"></div>
      <div className="bg-white w-[533px] p-4 rounded-2xl z-50 flex flex-col gap-4">
        <div className="title text-2xl font-bold">Change profile picture</div>
        <div className="inner flex items-center flex-col gap-4">
          <div className="flex justify-center items-center">
            {selectedFile ? <AvatarRender image={previewUrl} /> : <Avatar />}
          </div>
          <div className="flex justify-end items-center rounded-2xl w-[200px] py-2 px-4 border-[1px] border-black font-bold hover:bg-black hover:text-white transition duration-300">
            <label className="cursor-pointer">
              Upload new picture
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        {message && <div style={{ color: messageColor }}>{message}</div>}
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
            onClick={handleUpload}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
