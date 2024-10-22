import React from "react";

interface AuctionIconProps {
  fill: string;
}

const AuctionIconRender: React.FC<AuctionIconProps> = ({ fill }) => {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9978 2.69L14.9978 7.19V15H12.9978V9H6.9978V15H4.9978V7.19L9.9978 2.69ZM9.9978 0L-0.00219727 9H2.9978V17H8.9978V11H10.9978V17H16.9978V9H19.9978L9.9978 0Z"
        fill={fill}
      />
    </svg>
  );
};

export default AuctionIconRender;
