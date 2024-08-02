// Card.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuctionImageRender from "./AuctionImageRender";
import clockIcon from "../../assets/icons/clock-icon.svg";
import { getCurrentAuctionAvatar } from "../../utils/auctionUtils";
import BinIconRender from "../../assets/icons/BinIconRender";
import EditAuction from "../../pages/auctions/addAuction/EditAuction";
import * as API from "../../api/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auctionStore from "../../stores/auction.store";

interface CardProps {
  id: string;
  bidStatus?: string;
  auctionEndTime?: Date;
  title?: string;
  price?: number;
  bidders?: string[];
  loggedInUserId?: string;
  setActiveTab: (tab: "auctions" | "profile" | "unclicked") => void;
}

const CardPrivate: React.FC<CardProps> = ({
  id,
  bidStatus = "Outbid",
  auctionEndTime = new Date(),
  title = "Dummy Item Name",
  price = 0,
  bidders = [],
  loggedInUserId = "",
  setActiveTab,
}) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    editAuction: false,
    profileSettings: false,
    miniSettings: false,
  });

  const handleOpenModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
  };

  const handleCloseModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }));
  };

  useEffect(() => {
    getCurrentAuctionAvatar(parseInt(id)).then((url) =>
      url === "" ? setImageUrl("") : setImageUrl(url)
    );
  }, [id]);

  const calculateRemainingTime = (endTime: Date) => {
    const now = new Date();
    const timeDiff = endTime.getTime() - now.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes <= 60) {
      return `${minutes}m`;
    } else if (hours <= 48) {
      return `${hours}h`;
    } else {
      return `${days}days`;
    }
  };

  const calculateRemainingHours = (endTime: Date) => {
    const now = new Date();
    const timeDiff = endTime.getTime() - now.getTime();
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return hours;
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const determineBidStatus = () => {
    let color;
    switch (bidStatus) {
      case "In progress":
        color = "bg-progressAuc";
        break;
      case "Done":
        color = "bg-black";
        break;
      case "Winning":
        color = "bg-winningAuction";
        break;
      case "Outbid":
        color = "bg-outbidAuction";
        break;
      default:
        color = "defaultColor"; // Replace with a default color if needed
    }

    return {
      status: bidStatus,
      color: color,
    };
  };

  const { status, color } = determineBidStatus();

  const handleCardClick = () => {
    setActiveTab("unclicked");
  };

  const handleAuctionDelete = async () => {
    try {
      console.log("Attempting to delete auction...");

      const response = await API.deleteAuction(id);

      if (!response.ok) {
        if (response.status !== 200) {
          throw new Error(
            "Either auction does not exist or server is down. Refresh for more info"
          );
        } else {
          await auctionStore.fetchMyAuctions();
          auctionStore.showToast("success", "Auction deleted successfully!");
        }
      }
    } catch (error) {
      toast.error("Failed to delete auction. (Error in console F12)", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const bgColorClass =
    calculateRemainingHours(auctionEndTime) > 24
      ? "bg-white"
      : "bg-outbidAuction";

  return (
    <>
      <EditAuction
        id={id} // Modal has to know which auction we gonna edit
        isOpen={modalState.editAuction}
        onClose={() => handleCloseModal("editAuction")}
      />
      <div className="bg-white card w-[216px] h-min  rounded-2xl flex-shrink-0 relative z-10">
        <Link
          to={`/auctions/${id}/bid`}
          className="block"
          onClick={handleCardClick}
        >
          <div className="">
            <div className="px-2 pb-1 pt-2 gap-2">
              <div className="prvi_Row bid_status pa ura_ikona flex items-center justify-between">
                <div
                  className={`text-[10px] ${color} ${
                    status === "Done" ? "text-white" : ""
                  } font-light rounded-lg px-1 py-[2px]"`}
                >
                  {status}
                </div>
                {status === "Done" ? (
                  <></>
                ) : (
                  <div
                    className={`24h ikona text-[10px] ${bgColorClass} rounded-lg px-1 py-[2px] flex gap-1 items-center`}
                  >
                    {calculateRemainingTime(auctionEndTime)}
                    <img src={clockIcon} alt="clock icon" className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="drugi_Row title itema leading-6">
                {truncateTitle(title, 15)}
              </div>
              <div className="treti_Row cena leading-6">{price} €</div>
            </div>
            <div className="flex justify-center items-center pb-1 px-1 rounded-2xl overflow-hidden">
              {imageUrl &&
                (status === "In progress" ? (
                  <AuctionImageRender image={imageUrl} privateAuction={false} />
                ) : (
                  <AuctionImageRender image={imageUrl} privateAuction={true} />
                ))}
            </div>
          </div>
        </Link>
        {status === "In progress" ? (
          <div className="Kanta_Edit bg-white px-1 pb-1 pt-2 mt-1 border-collapse flex items-center gap-1 rounded-t-none rounded-2xl">
            <div
              className="py-3 px-3 flex justify-center items-center rounded-2xl border border-black hover:bg-black hover:text-white transition duration-300 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleAuctionDelete}
            >
              <div className="w-4 h-2 flex justify-center items-center ">
                <BinIconRender fill={isHovered ? "white" : "black"} />
              </div>
            </div>
            <div
              className="logout w-full min-h-full rounded-2xl px-4 py-2 flex justify-center items-center gap-2 border-[1px] bg-black text-white border-black font-bold cursor-pointer"
              // onClick={() => alert("Oi id od karte je : " + id)}
              onClick={() => handleOpenModal("editAuction")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M7.37333 4.01333L7.98667 4.62667L1.94667 10.6667H1.33333V10.0533L7.37333 4.01333ZM9.77333 0C9.60667 0 9.43333 0.0666666 9.30667 0.193333L8.08667 1.41333L10.5867 3.91333L11.8067 2.69333C12.0667 2.43333 12.0667 2.01333 11.8067 1.75333L10.2467 0.193333C10.1133 0.06 9.94667 0 9.77333 0ZM7.37333 2.12667L0 9.5V12H2.5L9.87333 4.62667L7.37333 2.12667Z"
                  fill="white"
                />
              </svg>
              Edit
            </div>
          </div>
        ) : (
          <div className="Kanta_Edit bg-white rounded-t-none rounded-2xl "></div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default CardPrivate;
