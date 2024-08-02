import React from "react";

interface TitleProps {
  title: string;
  name: string;
}

const Title: React.FC<TitleProps> = ({ title, name }) => {
  return (
    <div className="bg-background flex justify-between px-8 py-2 max-w-1440 mx-auto">
      {title === "Auctions" ? (
        <h1 className="text-4xl font-bold">Auctions</h1>
      ) : (
        <h1 className="text-4xl font-bold">Hello {name}!</h1>
      )}
    </div>
  );
};

export default Title;
