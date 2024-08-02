import React from "react";

const Error404: React.FC = () => {
  return (
    <div
      className="bg-background 
     px-8 max-w-1440 h-[786px] mx-auto gap-3 flex flex-col justify-center items-center"
    >
      <div className="grande text-center text-[rgb(255,45,45)] text-[300px]">
        404!
      </div>
      <div className="wapper flex flex-col justify-center items-center w-[331px]">
        <div className="Ohnooo text-[26px] font-bold">404? What?</div>
        <div className="info text-center text-[#74817F]">
          <p>
            Page you are looking for does <br />
            not exist or it's renamed, moved ... <br />
            Try again later! <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error404;
