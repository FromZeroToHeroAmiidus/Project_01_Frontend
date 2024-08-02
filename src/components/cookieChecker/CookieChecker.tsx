import React, { useEffect, useState } from "react";

const CookieChecker = () => {
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    const cookieExists = document.cookie.split(";").some((cookie) => {
      return cookie.trim().startsWith("access_token=");
    });

    setHasCookie(cookieExists);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {hasCookie ? <p>You have the cookie!</p> : <p>No cookie found.</p>}
    </div>
  );
};

export default CookieChecker;
