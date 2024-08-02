import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clockIcon from "../../assets/icons/clock-icon.svg";
import {
  findOneAuction,
  findOneAuctionStatusMatter,
  getCurrentAuctionAvatar,
} from "../../utils/auctionUtils";
import { AuctionDataType } from "../../models/auctions";
import BiddingItemComponent from "./auctionItem/BiddingItemComponent";
import Error404 from "../../pages/errorPage/Error404";
import * as API from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { Bid } from "../../models/bid";

const AuctionItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<AuctionDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // State to store the image URL
  const [bids, setBids] = useState<Bid[]>([]); // State to store the bids
  const [bidAmount, setBidAmount] = useState<string>(""); // State to store the bid amount

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const auctionItem = await findOneAuctionStatusMatter(Number(id));
        if (!auctionItem) {
          throw new Error("Item not found");
        }
        setItem(auctionItem.auction);
        {
          auctionItem.auction.currentBid === 0
            ? setBidAmount(auctionItem.auction.startingBid.toString())
            : setBidAmount(auctionItem.auction.currentBid.toString());
        }
        // setBidAmount(auctionItem.currentBid.toString());

        const url = await getCurrentAuctionAvatar(Number(id));
        setImageUrl(url);

        await fetchBids();
      } catch (error: any) {
        console.error("Error fetching auction item:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchBids = async () => {
    try {
      const bids = await API.fetch10Bids(id as string);
      setBids(bids);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  if (loading) {
    //return <div>Loading...</div>;

    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <Error404 />;
  }

  if (!item) {
    return <div>No item found.</div>;
  }

  const calculateRemainingTime = (endTime: string | Date) => {
    const endDate = new Date(endTime);
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return "<60sec";
    }
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const determineBidStatus = () => {
    let color;
    switch (item.status) {
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
        color = "defaultColor";
    }

    return {
      status: item.status,
      color: color,
    };
  };

  const { status, color } = determineBidStatus();

  const handlePlaceBid = async () => {
    try {
      console.log("Attempting to place bid...");

      const response = await API.placeBid(bidAmount, id as string);

      if (response.status > 201) {
        throw new Error(`${response.data.message}`);
      } else {
        toast.success("Bid placed successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await fetchBids(); // Fetch the updated bids after placing a new bid
      }
    } catch (error) {
      // skillMentor will say >> but dog you should've used useState to catch errors ... bruh?
      // console.error("Error placing bid", error);
      alert(error);
      // Due to lack of time (not implementing mobx or Redux i am doing this 0 brain mode)
      // User will get it's list refreshed
      await fetchBids(); // Fetch the updated bids after placing a new bid
    }
  };

  const calculateRemainingHours = (endTime: string | Date) => {
    const endDate = new Date(endTime);
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    // console.log({ days });
    return days;
  };

  const bgColorClass =
    calculateRemainingHours(item.endTime) > 0 ? "bg-white" : "bg-outbidAuction";

  return (
    <div className="MAIN-CONTAINER bg-background flex flex-wrap px-8 pb-8  max-w-1440 max-h-1088 mx-auto gap-2">
      <div className="INNER max-w-[1376px] flex gap-4">
        <div className="IMAGE w-[680px] h-[898px] rounded-2xl bg-white flex justify-center items-center gap-4">
          <img
            src={imageUrl}
            className="image object-fill items-center   justify-center w-full h-full rounded-2xl"
            alt="Auction's Image"
          />
        </div>
        <div className="RIGHTSIDE w-[680px] h-[888px] rounded-2xl flex flex-col gap-4 ">
          <div className="DETAILS_CARD w-[680px] h-[283px] rounded-2xl p-2 bg-white flex flex-col">
            <div className="prvi_Row bid_status pa ura_ikona flex items-center justify-between">
              <div className="hah flex justify-center items-center">
                <div
                  className={` w-max text-[16px] ${color} ${
                    status === "Done" ? "text-white" : ""
                  } font-light rounded-2xl px-[8px] py-[2px]`}
                >
                  {status}
                </div>
              </div>
              {status === "Done" ? (
                <></>
              ) : (
                <div
                  className={`24h ikona text-base rounded-2xl h-[28px] w-[69px] px-[2px] py-[2px] flex gap-1 ${bgColorClass} items-center justify-center`}
                >
                  {calculateRemainingTime(item.endTime)}
                  <img src={clockIcon} alt="clock icon" className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="drugi_Row title itema text-[32px] font-bold leading-6 mt-4 mb-4">
              {truncateTitle(item.title, 20)}
            </div>

            <div className="tretji_Row opis itema text-[16px] leading-6  h-[100px] overflow-y-auto	no-scrollbar pb-2">
              {truncateTitle(item.description, 500)}
            </div>
            {status === "Done" ? (
              <></>
            ) : (
              <div className="actionBar:bid:oknce:gumb h-10 flex gap-2 justify-end items-center   mt-4">
                <div className="leading-6">Bid: </div>
                <div>
                  <input
                    type="number"
                    className="w-[83px] h-[40px] p-2 border-[1px] border-bidBorder rounded-2xl [appearance:textfield]"
                    placeholder="0 €"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                    }}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </div>
                <div
                  className="bg-logoYellow py-2 px-4 font-bold rounded-2xl flex gap-2 items-center justify-center overflow-hidden hover:bg-addAuctionHover"
                  onClick={handlePlaceBid}
                >
                  Place bid
                </div>
              </div>
            )}
          </div>
          <div className="BIDDING_HISTORY w-[680px] h-[593px] rounded-2xl py-4 px-2 gap-4 bg-white">
            <div className="title">
              <div className="tekst text-[23px] font-bold ">
                Bidding history ({bids.length})
              </div>

              <div className="bidtable flex h-[520px] flex-col overflow-y-auto no-scrollbar">
                {bids.map((bid) => (
                  <BiddingItemComponent
                    key={bid.id}
                    firstName={bid.firstName}
                    lastName={bid.lastName}
                    avatar={bid.avatar}
                    createdAt={bid.createdAt}
                    amount={bid.amount}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuctionItem;
