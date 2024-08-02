import React from "react";
import mainFotka from "../../assets/images/auctions 1.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="bg-background flex flex-col px-8 max-w-1440 mx-auto h-[862px] py-0">
      <div className="wraper flex flex-col gap-2 justify-center items-center">
        <div className="header font-bold text-[64px]">
          {" "}
          <h1>E-auctions made easy!!</h1>
        </div>
        <div className="podtext text-[16px] flex flex-col items-center justify-center text-center">
          <p>Simple way for selling your unused products or,</p>
          <p> getting a deal on product you want!</p>
        </div>
      </div>
      <div className="gumb flex justify-center items-center mt-11">
        <button
          type="button"
          onClick={() => (window.location.href = "/signup")}
          className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
        >
          Start bidding
        </button>
      </div>
      <div className="slika flex justify-center items-top mt-11 pt-[70px]">
        <img src={mainFotka} alt="auctions.jpg" className="" />
      </div>
    </div>
  );
};

export default HomePage;
