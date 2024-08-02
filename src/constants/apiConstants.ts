export enum apiRoutes {
  SIGNOUT = "/auth/signout",
  REFRESH_TOKENS = "/auth/refresh",
  LOGIN = "/auth/signin",
  SIGNUP = "/auth/signup",
  FETCH_UNNY = "/users/me",
  REFRESH_ACCESS_TOKEN = "/auth/refresh-token",
  UPDATE_USER = "/users/update-profile",
  UPDATE_PASSWORD = "/users/change-password",
  CHANGE_PROFILE_PICTURE = "/users/change-profile-picture",
  RESET_PASSWORD_REQUEST = "/auth/request-password-reset",
  RESET_PASSWORD_CONFIRM = "auth/reset-password",

  //auctions
  FETCH_ALL_AUCTIONS_BUT_ME = "/auctions/active/other-users",
  FETCH_ALL_USER_AUCTIONS = "/auctions/user",
  FETCH_LAST4_AUCTIONS = "/auctions/latest",
  POST_AUCTION = "/auctions/create",
  UPLOAD_AUCTION_IMAGE = "/auctions/upload",
  EDIT_AUCTION_ID = "/auctions",
  FETCH_LAST10_BIDDERS_OF_AUCTION = "/auctions",
  FETCH_WON_AUCTIONS = "/auctions/won",
  FETCH_BIDDING_AUCTIONS = "/auctions/bidding",
  FETCH_MY_AUCTIONS = "/auctions/user",

  //bid
  PLACE_BID = "/bids",

  //project req
  NEO_LOGIN = "/login",
  NEO_SIGNUP = "/signup",
  NEO_FETCH_UNNY = "/me",
  NEO_POST_AUCTION = "/me/auction",
  NEO_EDIT_AUCTION_ID = "/me/auction",
  NEO_UPDATE_PASSWORD = "/me/update-password",
  NEO_ALL_AUCTIONS_LITERALLY_ALL = "/auctions",
}
