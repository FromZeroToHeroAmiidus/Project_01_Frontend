import { apiRoutes } from "../constants/apiConstants";
import { apiRequest, apiRequestNoToken } from "./Api";
import {
  AuctionCreateDataType,
  AuctionDataType,
  EditAuctionFields,
  PostAuctionFields,
} from "../models/auctions";

export const fetchAuctionsButMe = async () =>
  apiRequest<undefined, AuctionDataType[]>(
    "get",
    apiRoutes.FETCH_ALL_AUCTIONS_BUT_ME
  );

export const fetchUserAuctions = async () =>
  apiRequest<undefined, AuctionDataType[]>(
    "get",
    apiRoutes.FETCH_ALL_USER_AUCTIONS
  );

export const fetch4LastAuctions = async () =>
  apiRequestNoToken<undefined, AuctionDataType[]>(
    "get",
    apiRoutes.FETCH_LAST4_AUCTIONS
  );

// new style

export const postAuction = async (data: PostAuctionFields) =>
  apiRequest<PostAuctionFields, PostAuctionFields>(
    "post",
    // apiRoutes.POST_AUCTION,
    apiRoutes.NEO_POST_AUCTION,
    data
  );

export const uploadAuctionImage = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    "patch",
    `${apiRoutes.UPLOAD_AUCTION_IMAGE}/${id}`,
    formData
  );

// edit auction

export const editAuction = async (data: PostAuctionFields, id: string) =>
  apiRequest<PostAuctionFields, PostAuctionFields>(
    "patch",
    // `${apiRoutes.EDIT_AUCTION_ID}/${id}`,
    `${apiRoutes.NEO_EDIT_AUCTION_ID}/${id}`,
    data
  );

export const deleteAuction = async (id: string) =>
  apiRequest<void, void>("delete", `${apiRoutes.EDIT_AUCTION_ID}/${id}`);

export const fetch10Bids = async (id: string) => {
  try {
    const response = await apiRequest<any[]>(
      "get",
      `${apiRoutes.FETCH_LAST10_BIDDERS_OF_AUCTION}/${id}/bids`
    );
    // console.log("Fetched bids:", response); // Log the response data
    return response.data; // Baby we need dataaaaaaaaaaaaaa
  } catch (error) {
    console.error("Error fetching bids:", error);
    return []; // Return an empty array in case of error
  }
};

// tole gre POD BIDS.TS :D

export const placeBid = async (amount: string, id: string) => {
  try {
    const response = await apiRequest<{ amount: number }, void>(
      "post",
      `${apiRoutes.PLACE_BID}/${id}`,
      { amount: parseFloat(amount) } // Sending amount as part of the request body
    );
    //console.log("Bid response :", response); // Log the response data
    // return "Placed"; // Return a success message or handle as needed
    return response;
  } catch (error) {
    console.error("Error while placing a bid:", error);
    return "Error"; // Return an error message
  }
};

export const fetchMyAuctions = async () => {
  try {
    const response = await apiRequest<void, any[]>(
      "get",
      apiRoutes.FETCH_MY_AUCTIONS
    );
    return response?.data || []; // Return the data or an empty array
  } catch (error) {
    console.error("Error while fetching my auctions:", error);
    return []; // Return an empty array on error
  }
};

// Method to fetch the auctions the user is currently bidding on
export const fetchBiddingAuctions = async () => {
  try {
    const response = await apiRequest<void, any[]>(
      "get",
      apiRoutes.FETCH_BIDDING_AUCTIONS
    );
    //   console.log("Od HA HA -> ", response);
    return response?.data || []; // Return the data or an empty array
  } catch (error) {
    //  console.error("Error while fetching bidding auctions:", error);
    return []; // Return an empty array on error
  }
};

// Method to fetch the auctions the user has won
export const fetchWonAuctions = async () => {
  try {
    const response = await apiRequest<void, any[]>(
      "get",
      apiRoutes.FETCH_WON_AUCTIONS
    );
    return response?.data || []; // Return the data or an empty array
  } catch (error) {
    //   console.error("Error while fetching won auctions:", error);
    return []; // Return an empty array on error
  }
};
