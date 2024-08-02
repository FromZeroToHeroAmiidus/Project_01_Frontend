import React, { useEffect, useState } from "react";
import RetailLogin from "./components/RetailLogin";
import * as API from "../../api/Api";
import { AuctionDataType } from "../../models/auctions";
import { ClipLoader } from "react-spinners";
import Card from "../../components/card/Card";

const RetailLoginForm: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionData = await API.fetch4LastAuctions();
        setAuctions(auctionData.data);
        // toast.success("Auctions fetched successfully!");
      } catch (error) {
        console.error("Error fetching auctions:", error);
        //   toast.error("Error fetching auctions. Please try again later.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100); // Delay of 1 second
      }
    };

    fetchAuctions();
  }, []);

  const aboveAuctions = auctions.slice(0, 2);
  const belowAuctions = auctions.slice(2, 4);

  return (
    <div className="bg-background flex px-0 max-w-1440 mx-auto h-[1024px] justify-between">
      <div className="4auctions w-[968px] bg-background flex flex-col gap-2 items-center justify-center">
        {loading ? (
          <div className="flex justify-center items-center w-full h-screen">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <>
            <div className="GOR 2 flex gap-2">
              {aboveAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  id={auction.id.toString()}
                  bidStatus={auction.status}
                  auctionEndTime={new Date(auction.endTime)}
                  title={auction.title}
                  price={auction.startingBid}
                  loggedInUserId="39" // Replace with actual logged-in user ID
                  setActiveTab={function (
                    tab: "auctions" | "profile" | "unclicked"
                  ): void {
                    throw new Error("Function not implemented.");
                  }} //setActiveTab={setActiveTab}
                />
              ))}
            </div>

            <div className="SODI 2 flex gap-2">
              {belowAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  id={auction.id.toString()}
                  bidStatus={auction.status}
                  auctionEndTime={new Date(auction.endTime)}
                  title={auction.title}
                  price={auction.startingBid}
                  loggedInUserId="39" // Replace with actual logged-in user ID
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
      </div>
      <div className="flex justify-center items-center pr-2">
        <RetailLogin />
      </div>
    </div>
  );
};

export default RetailLoginForm;
