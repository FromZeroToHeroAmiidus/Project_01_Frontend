// TODO:
// All done
import React, { useState } from "react";
import EurIconRender from "../assets/icons/EurIconRender";
import ClockIconRender from "../assets/icons/ClockIconRender";
import steamDeck from "../assets/images/mikrofon.jpg";
import ProfileSettings from "./ProfileSettings";
import LogoutButton from "../components/parts/LogoutButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniSettings: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isFocusedPrice, setIsFocusedPrice] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);
  const [imageSet, setImageSet] = useState(true);

  const setImageStatus = () => {
    imageSet ? setImageSet(false) : setImageSet(true);
  };

  const [modalState, setModalState] = useState<{ [key: string]: boolean }>({
    addAuction: false,
    profileSettings: false,
    miniSettings: false,
  });

  const handleOpenModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
  };

  const handleCloseModal = (modalName: string) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: false }));
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    // <div className="main fixed inset-0 w-[533px] rounded-2xl p-4 flex gap-4 z-50">
    //   <div className="title z-10">Add auction</div>
    // </div>
    <div className="absolute flex w-[250px] justify-end items-center mt-[222px] right-0">
      <div className="fixed inset-0 z-0" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-2xl z-50 flex flex-col gap-[17px] shadow-custom-combined">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          //   className="ikona rounded-2xl py-2 px-4 flex justify-center items-center gap-2 font-bold hover:bg-black"
          className={`ikona rounded-2xl py-2 px-4 flex justify-center items-center gap-2 font-bold hover:bg-black hover:text-white transition duration-300`}
          onClick={() => handleOpenModal("profileSettings")}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9532 8.6535C12.9799 8.44016 12.9999 8.22683 12.9999 8.00016C12.9999 7.7735 12.9799 7.56016 12.9532 7.34683L14.3599 6.24683C14.4866 6.14683 14.5199 5.96683 14.4399 5.82016L13.1066 3.5135C13.0466 3.40683 12.9332 3.34683 12.8132 3.34683C12.7732 3.34683 12.7332 3.3535 12.6999 3.36683L11.0399 4.0335C10.6932 3.76683 10.3199 3.54683 9.91323 3.38016L9.65989 1.6135C9.63989 1.4535 9.49989 1.3335 9.33323 1.3335H6.66656C6.49989 1.3335 6.35989 1.4535 6.33989 1.6135L6.08656 3.38016C5.67989 3.54683 5.30656 3.7735 4.95989 4.0335L3.29989 3.36683C3.25989 3.3535 3.21989 3.34683 3.17989 3.34683C3.06656 3.34683 2.95323 3.40683 2.89323 3.5135L1.55989 5.82016C1.47323 5.96683 1.51323 6.14683 1.63989 6.24683L3.04656 7.34683C3.01989 7.56016 2.99989 7.78016 2.99989 8.00016C2.99989 8.22016 3.01989 8.44016 3.04656 8.6535L1.63989 9.7535C1.51323 9.8535 1.47989 10.0335 1.55989 10.1802L2.89323 12.4868C2.95323 12.5935 3.06656 12.6535 3.18656 12.6535C3.22656 12.6535 3.26656 12.6468 3.29989 12.6335L4.95989 11.9668C5.30656 12.2335 5.67989 12.4535 6.08656 12.6202L6.33989 14.3868C6.35989 14.5468 6.49989 14.6668 6.66656 14.6668H9.33323C9.49989 14.6668 9.63989 14.5468 9.65989 14.3868L9.91323 12.6202C10.3199 12.4535 10.6932 12.2268 11.0399 11.9668L12.6999 12.6335C12.7399 12.6468 12.7799 12.6535 12.8199 12.6535C12.9332 12.6535 13.0466 12.5935 13.1066 12.4868L14.4399 10.1802C14.5199 10.0335 14.4866 9.8535 14.3599 9.7535L12.9532 8.6535ZM11.6332 7.5135C11.6599 7.72016 11.6666 7.86016 11.6666 8.00016C11.6666 8.14016 11.6532 8.28683 11.6332 8.48683L11.5399 9.24016L12.1332 9.70683L12.8532 10.2668L12.3866 11.0735L11.5399 10.7335L10.8466 10.4535L10.2466 10.9068C9.95989 11.1202 9.68656 11.2802 9.41323 11.3935L8.70656 11.6802L8.59989 12.4335L8.46656 13.3335H7.53323L7.40656 12.4335L7.29989 11.6802L6.59323 11.3935C6.30656 11.2735 6.03989 11.1202 5.77323 10.9202L5.16656 10.4535L4.45989 10.7402L3.61323 11.0802L3.14656 10.2735L3.86656 9.7135L4.45989 9.24683L4.36656 8.4935C4.34656 8.28683 4.33323 8.1335 4.33323 8.00016C4.33323 7.86683 4.34656 7.7135 4.36656 7.5135L4.45989 6.76016L3.86656 6.2935L3.14656 5.7335L3.61323 4.92683L4.45989 5.26683L5.15323 5.54683L5.75323 5.0935C6.03989 4.88016 6.31323 4.72016 6.58656 4.60683L7.29323 4.32016L7.39989 3.56683L7.53323 2.66683H8.45989L8.58656 3.56683L8.69323 4.32016L9.39989 4.60683C9.68656 4.72683 9.95323 4.88016 10.2199 5.08016L10.8266 5.54683L11.5332 5.26016L12.3799 4.92016L12.8466 5.72683L12.1332 6.2935L11.5399 6.76016L11.6332 7.5135ZM7.99989 5.3335C6.52656 5.3335 5.33323 6.52683 5.33323 8.00016C5.33323 9.4735 6.52656 10.6668 7.99989 10.6668C9.47323 10.6668 10.6666 9.4735 10.6666 8.00016C10.6666 6.52683 9.47323 5.3335 7.99989 5.3335ZM7.99989 9.3335C7.26656 9.3335 6.66656 8.7335 6.66656 8.00016C6.66656 7.26683 7.26656 6.66683 7.99989 6.66683C8.73323 6.66683 9.33323 7.26683 9.33323 8.00016C9.33323 8.7335 8.73323 9.3335 7.99989 9.3335Z"
              fill={isHovered ? "white" : "#071015"}
            />
          </svg>
          Profile settings
        </button>

        <div className="logout rounded-2xl py-2 px-4 flex justify-center items-center gap-2 border-[1px] border-black font-bold hover:bg-black hover:text-white transition duration-300">
          {/* Log out */}
          <LogoutButton />
        </div>
      </div>
      <ProfileSettings
        isOpen={modalState.profileSettings}
        onClose={() => handleCloseModal("profileSettings")}
      />
    </div>
  );
};

export default MiniSettings;
