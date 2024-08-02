import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import CardPrivate from "../../components/card/CardPrivate";
import auctionStore from "../../stores/auction.store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

const MyAuctions: React.FC = observer(() => {
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        await auctionStore.fetchMyAuctions();
        // toast.success("Auctions fetched successfully!");
      } catch (error) {
        console.error("Error fetching auctions:", error);
        //   toast.error("Error fetching auctions. Please try again later.");
      }
    };

    fetchAuctions();
  }, []);

  const { auctions, loading } = auctionStore;

  return (
    <div
      className={`bg-background ${
        auctions.length > 18 ? "flex" : ""
      } px-8 max-w-1440 h-[824px] mx-auto gap-3 ${
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
                  <CardPrivate
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
                    loggedInUserId="39" // dummy
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

export default MyAuctions;
