import React from "react";
import defaultImage from "../../assets/images/surface_pro10.jpg";

interface AuctionImageRenderProps {
  image?: string | null;
  privateAuction: boolean;
}

const AuctionImageRender: React.FC<AuctionImageRenderProps> = ({
  image,
  privateAuction,
}) => {
  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <img
      src={image || ""}
      alt="Auction"
      onError={handleError}
      className="rounded-xl"
      style={{
        width: "auto",
        // 208 150 spodi
        height: privateAuction ? "208px" : "150px",
        objectFit: privateAuction ? "contain" : "fill",
      }}
    />
  );
};

export default AuctionImageRender;
