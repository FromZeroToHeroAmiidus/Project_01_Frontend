import React from "react";

interface AuctionIconProps {
  fill: string;
}

const BinIconRender: React.FC<AuctionIconProps> = ({ fill }) => {
  return (
    <svg
      width="9"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00016 10.6667C1.00016 11.4 1.60016 12 2.3335 12H7.66683C8.40016 12 9.00016 11.4 9.00016 10.6667V2.66667H1.00016V10.6667ZM2.3335 4H7.66683V10.6667H2.3335V4ZM7.3335 0.666667L6.66683 0H3.3335L2.66683 0.666667H0.333496V2H9.66683V0.666667H7.3335Z"
        fill={fill}
      />
    </svg>
  );
};

export default BinIconRender;
