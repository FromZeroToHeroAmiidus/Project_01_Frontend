// App.tsx
import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { fetchAllAuctionsButMe } from "../../utils/auctionUtils";
import { AuctionDataType } from "../../models/auctions";
import CardPrivate from "../../components/card/CardPrivate";
import * as API from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const AllAuctions = () => {
  const [auctions, setAuctions] = useState<AuctionDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionData = await API.fetchAuctionsButMe();
        setAuctions(auctionData.data);
        // toast.success("Auctions fetched successfully!");
      } catch (error) {
        console.error("Error fetching auctions:", error);
        //   toast.error("Error fetching auctions. Please try again later.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500); // Delay of 0,5 second
      }
    };

    fetchAuctions();
  }, []);
  //842
  return (
    <div
      className={`bg-background ${
        auctions.length > 18 ? "flex" : ""
      } px-8 max-w-1440 h-[880px] mx-auto gap-3 ${
        auctions.length === 0 ? "flex justify-center items-center" : ""
      }`}
    >
      {/* <ToastContainer /> */}
      {loading ? (
        <div className="relative flex justify-center items-center w-full h-full">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          <>
            {auctions.length === 0 ? (
              <div className="wapper flex flex-col justify-center items-center w-[331px]">
                <div className="Ohnooo text-[26px] font-bold">
                  Oh no, no auctions added!
                </div>
                <div className="info text-center text-[#74817F]">
                  <p>
                    To add new auction click “+” button in <br />
                    navigation bar and new auctions wil be <br />
                    added here!
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-background flex flex-wrap max-w-1440 gap-3 overflow-y-auto	no-scrollbar">
                  {auctions.map((auction) => (
                    <Card
                      key={auction.id}
                      id={auction.id.toString()}
                      bidStatus={auction.status}
                      auctionEndTime={new Date(auction.endTime)}
                      title={auction.title}
                      price={
                        auction.currentBid === 0
                          ? auction.startingBid
                          : auction.currentBid
                      }
                      loggedInUserId="98" // dummy
                      setActiveTab={function (
                        tab: "auctions" | "profile" | "unclicked"
                      ): void {
                        throw new Error("Function not implemented.");
                      }} //setActiveTab={setActiveTab}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default AllAuctions;
