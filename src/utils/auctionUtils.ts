import axios from "axios";
import { AuctionDataType } from "../models/auctions";
import { AuctionCreateDataType } from "../models/auctions";

export const fetchAllAuctionsButMe = async (): Promise<AuctionDataType[]> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.access_token;
    // console.log(token);
    const response = await axios.get<AuctionDataType[]>(
      `${import.meta.env.VITE_API_URL}/auctions/active/other-users`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Failed to fetch auctions");
  }
};

export const remainingHours = (endTime: string): number => {
  const endTimeMs = new Date(endTime).getTime();
  const currentTimeMs = new Date().getTime();
  const remainingMs = endTimeMs - currentTimeMs;
  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  return remainingHours;
};

export const createAuction = async (
  auctionData: AuctionCreateDataType
): Promise<void> => {
  try {
    const { title, description, image, startingBid, endTime } = auctionData;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // Send image path as string
    formData.append("startingBid", startingBid.toString());
    formData.append("endTime", endTime.toISOString()); // Convert Date to string

    await axios.post<void>(
      `${import.meta.env.VITE_API_URL}/auctions/create`,
      formData,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error creating auction:", error);
    throw new Error("Failed to create auction");
  }
};

export const getCurrentAuctionAvatar = async (id: number): Promise<string> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.access_token;
    //console.log(token);

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auctions/image/${id}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // Convert arraybuffer to base64
    const base64Image = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Error fetching auction image:", error);
    return "";
  }
};

export const findOneAuctionStatusMatter = async (
  id: number
): Promise<{ auction: AuctionDataType }> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.access_token;

    // Fetch the auction data including the status
    const response = await axios.get<{
      auction: AuctionDataType;
      status: string;
    }>(`${import.meta.env.VITE_API_URL}/auctions/me/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching auction:", error);
    throw new Error("Failed to fetch auction");
  }
};

export const findOneAuction = async (id: number): Promise<AuctionDataType> => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.access_token;
    const response = await axios.get<AuctionDataType>(
      `${import.meta.env.VITE_API_URL}/auctions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching auction:", error);
    throw new Error("Failed to fetch auction");
  }
};
