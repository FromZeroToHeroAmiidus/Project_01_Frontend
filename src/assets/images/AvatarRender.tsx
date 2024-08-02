import React from "react";

interface AvatarProps {
  image: string;
}

const AvatarRender: React.FC<AvatarProps> = ({ image }) => {
  return (
    <div
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img
        src={image}
        alt="Avatar"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default AvatarRender;
