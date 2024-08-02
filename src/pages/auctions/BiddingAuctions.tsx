import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CardPrivate from "../../components/card/CardPrivate";
import auctionStore from "../../stores/auction.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import Card from "../../components/card/Card";

const BiddingAuctions: React.FC = observer(() => {
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        await auctionStore.fetchBiddingAuctions();
        // toast.success("Auctions fetched successfully!");
      } catch (error) {
        console.error("Error fetching auctions:", error);
        // toast.error("Error fetching auctions. Please try again later.");
      }
    };

    fetchAuctions();
  }, []);

  const { biddingAuctions, loading } = auctionStore;
  //786
  return (
    <div
      className={`bg-background ${
        biddingAuctions.length > 18 ? "flex" : ""
      } px-8 max-w-1440 h-[824px] mx-auto gap-3 ${
        biddingAuctions.length === 0 ? " flex justify-center items-center" : ""
      }`}
    >
      {/* <ToastContainer /> */}
      {loading ? (
        <div className="relative flex justify-center items-center w-full h-full">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <>
          {biddingAuctions.length === 0 ? (
            <div className="wapper flex flex-col justify-center items-center w-[331px]">
              <div className="Ohnooo text-[26px] font-bold">
                No bidding in progress!
              </div>
              <div className="info text-center text-[#74817F]">
                <p>
                  Start bidding by finding new items you <br />
                  like on “Auction” page!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-background flex flex-wrap max-w-1440 gap-3 overflow-y-auto	no-scrollbar">
                {biddingAuctions.map((auction) => (
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
      )}
    </div>
  );
});

export default BiddingAuctions;
