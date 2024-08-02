// auctionStore.ts
import { makeAutoObservable } from "mobx";
import * as API from "../api/Api";
import { AuctionDataType } from "../models/auctions";
import { toast } from "react-toastify";

class AuctionStore {
  auctions: AuctionDataType[] = [];
  biddingAuctions: AuctionDataType[] = [];
  wonAuctions: AuctionDataType[] = [];
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMyAuctions() {
    this.loading = true;
    try {
      const response = await API.fetchMyAuctions();
      this.auctions = response || []; // Ensure auctions is an array
      // console.log(response);
    } catch (error) {
      console.error("Error fetching my auctions:", error);
      this.auctions = []; // Set to an empty array on error
    } finally {
      this.loading = false;
    }
  }

  async fetchBiddingAuctions() {
    this.loading = true;
    try {
      const response = await API.fetchBiddingAuctions();
      this.biddingAuctions = response || [];
      // console.log("Pizda no : ", response);
    } catch (error) {
      console.error("Error fetching bidding auctions:", error);
      this.biddingAuctions = [];
    } finally {
      this.loading = false;
    }
  }

  async fetchWonAuctions() {
    this.loading = true;
    try {
      const response = await API.fetchWonAuctions();
      this.wonAuctions = response || [];
    } catch (error) {
      console.error("Error fetching won auctions:", error);
      this.wonAuctions = [];
    } finally {
      this.loading = false;
    }
  }

  showToast(type: "success" | "error", message: string) {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
}

const auctionStore = new AuctionStore();
export default auctionStore;
