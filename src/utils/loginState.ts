let isLoggedIn = false;

export const setIsLoggedIn_ = (value: boolean) => {
  isLoggedIn = value;
};

export const getIsLoggedIn = () => {
  return isLoggedIn;
};
