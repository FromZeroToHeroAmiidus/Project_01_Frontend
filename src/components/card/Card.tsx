import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuctionImageRender from "./AuctionImageRender";
import clockIcon from "../../assets/icons/clock-icon.svg";
import { getCurrentAuctionAvatar } from "../../utils/auctionUtils";

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

const Card: React.FC<CardProps> = ({
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
        color = "bg-red-500";
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

  const bgColorClass =
    calculateRemainingHours(auctionEndTime) > 24
      ? "bg-white"
      : "bg-outbidAuction";

  return (
    <Link
      to={`/auctions/${id}/bid`}
      className="block"
      onClick={handleCardClick}
    >
      <div className="bg-white card w-[216px] h-[235px] rounded-2xl flex-shrink-0">
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
        <div className="flex justify-center items-center px-2 rounded-xl">
          {imageUrl && (
            <AuctionImageRender image={imageUrl} privateAuction={false} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
