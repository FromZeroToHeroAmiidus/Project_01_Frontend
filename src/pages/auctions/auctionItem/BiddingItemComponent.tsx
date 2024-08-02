import React from "react";
import euroIcon from "../../../assets/icons/€-icon.svg";
import { date } from "yup";

interface BiddingItemProps {
  firstName: string;
  lastName: string;
  avatar: string;
  createdAt: string;
  amount: number;
}

const BiddingItemComponent: React.FC<BiddingItemProps> = ({
  firstName,
  lastName,
  avatar,
  createdAt,
  amount,
}) => {
  const formatDateTime = (datetime: string) => {
    const date = new Date(datetime);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  };

  return (
    <div className="bidder border-b-[1px] py-2  border-contentBarBg flex gap-8 items-center justify-between">
      <div className="avatarInime flex flex-1 gap-4 items-center">
        <img
          src={import.meta.env.VITE_API_URL + "/files/" + avatar}
          className="image object-contain w-8 h-8 rounded-full"
          alt="Bidder's avatar"
        />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <div className="uraIndatum">
        <p>{formatDateTime(createdAt)}</p>
      </div>
      <div className="znesekBida bg-logoYellow rounded-2xl py-[6px] px-4 flex gap-1 items-center font-bold w-[150px] justify-around">
        <div className="amount flex flex-1">
          {" "}
          {/*figma frame was a bit too short for bigger values like 1500.99€*/}
          <p>{amount}</p>
        </div>
        <div className="icon">
          <img
            src={euroIcon}
            className="image object-contain w-4 h-4"
            alt="Bidder's avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default BiddingItemComponent;
