import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as API from "../../../api/Api";

const RetailPasswordResetConfirm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await API.resetPassword({ token });
      if (response.status === 200) {
        setSuccess(
          "Password has been reset. A new password has been sent to your email."
        );
        setError("");
        // Optionally redirect to login page
        setTimeout(() => navigate("/login"), 3000);
      } else {
        throw new Error(response.data.message || "Reset failed.");
      }
    } catch (error: any) {
      console.error("Password reset error:", error.message);
      setError(
        error.response?.data.message || "An error occurred. Please try again."
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  return (
    <div className="flex h-full items-center justify-center item-center  py-2">
      <div className="h-full w-[448px] mx-4 my-8 p-8 rounded-2xl bg-white shadow-lg flex items-center">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            Please confirm your password reset
          </p>
          <p className="mb-4">
            Please confirm that you really want your password to be reset. Click
            on the button below to proceed.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {loading ? (
            <div className="relative flex justify-center items-center">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          ) : (
            <button
              className="w-full py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
              onClick={handleResetPassword}
            >
              RESET PASSWORD
            </button>
          )}
          <div className="mt-4 text-gray-600">
            <p>
              After resetting, you will receive a temporary password via email.
              Please change it as soon as possible in your profile settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailPasswordResetConfirm;
