import React from "react";

interface ClockIconProps {
  fill: string;
}

const ClockIconRender: React.FC<ClockIconProps> = ({ fill }) => {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.12 2.875C6.535 2.29 5.77 1.99499 5 1.99499V4.995L2.88 7.115C4.05 8.285 5.95 8.285 7.125 7.115C8.295 5.94499 8.295 4.045 7.12 2.875ZM5 -0.00500488C2.24 -0.00500488 0 2.235 0 4.995C0 7.755 2.24 9.995 5 9.995C7.76 9.995 10 7.755 10 4.995C10 2.235 7.76 -0.00500488 5 -0.00500488ZM5 8.995C2.79 8.995 1 7.205 1 4.995C1 2.785 2.79 0.994995 5 0.994995C7.21 0.994995 9 2.785 9 4.995C9 7.205 7.21 8.995 5 8.995Z"
        fill={fill}
      />
    </svg>
  );
};

export default ClockIconRender;
