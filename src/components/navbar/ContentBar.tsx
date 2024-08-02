import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContentBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "userAuctions" | "bidding" | "won"
  >("userAuctions");

  return (
    <div className="bg-background flex justify-center items-center max-w-1440 mx-auto pb-2">
      <div className="bg-contentBarBg flex p-1 gap-2 rounded-2xl">
        <Link to="/me/myauctions">
          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
              activeTab === "userAuctions"
                ? "bg-black text-white hover:cursor-default"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("userAuctions")}
          >
            <span>My auctions</span>
          </button>
        </Link>
        <Link to="/me/bidding">
          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
              activeTab === "bidding"
                ? "bg-black text-white hover:cursor-default"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("bidding")}
          >
            <span>Bidding</span>
          </button>
        </Link>
        <Link to="/me/won">
          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-colors ${
              activeTab === "won"
                ? "bg-black text-white hover:cursor-default"
                : "bg-white text-black"
            }`}
            onClick={() => setActiveTab("won")}
          >
            <span>Won</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContentBar;
