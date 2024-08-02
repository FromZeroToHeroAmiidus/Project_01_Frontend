import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";
import ClipLoader from "react-spinners/ClipLoader";
import * as API from "../../../api/Api";
import { Link } from "react-router-dom";

const RetailPasswordReset: React.FC = () => {
  const [formError, setFormError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Start loading spinner
      try {
        const response = await API.forgotPassword(values);
        if (response.status === 200) {
          setSuccessMessage("E-mail is on its way! Check your inbox or spam!");
          setFormError(""); // Clear any existing form errors
          setIsButtonDisabled(true); // Disable the button after success
        } else {
          throw new Error(response.data.message);
        }
      } catch (error: any) {
        console.error("Password reset failed:", error.message);
        if (error.response) {
          const errorMessage = error.response.data.message;
          setFormError(`Password reset failed: ${errorMessage}`);
          setSuccessMessage(""); // Clear any existing success message
        } else {
          setFormError("Password reset failed: " + error.message);
          setSuccessMessage(""); // Clear any existing success message
        }
      } finally {
        setLoading(false); // Stop loading spinner
      }
    },
  });

  return (
    <div className="wearesoback h-full flex">
      <div className="Wrapper w-[448px] my-2 mx-0 rounded-[32px] px-8 py-16 flex flex-col flex-1 justify-between items-center bg-white gap-8">
        <div className="bg-logoYellow rounded-full w-16 h-16 flex items-center justify-center">
          <img className="max-w-none" src={logo} alt="logo" />
        </div>
        <form
          className="FormWrapper flex flex-col gap-8 w-full items-center"
          onSubmit={formik.handleSubmit}
          aria-busy={loading} // ARIA attribute to indicate loading state
          aria-live="polite" // ARIA attribute for live regions
        >
          <div className="WelcomeText flex flex-col gap-2 items-center">
            <p className="font-bold text-[32px]">Forgot password?</p>
            <p>No worries, we will send you reset instructions</p>
          </div>
          <div className="FormIndeed flex flex-col gap-4 w-full">
            <div className="Desc flex flex-col gap-2">
              <label htmlFor="email" className="font-bold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...formik.getFieldProps("email")}
                className={`py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none w-full ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                aria-describedby="emailError"
              />
              {formik.touched.email && formik.errors.email ? (
                <p id="emailError" className="text-red-500 text-xs">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
              disabled={isButtonDisabled} // Disable button based on state
              aria-disabled={isButtonDisabled} // ARIA attribute for button state
            >
              Reset password
            </button>
            {loading ? (
              <div className="relative flex justify-center items-center">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : (
              <>
                {successMessage && (
                  <p className="text-green-500 font-bold text-xs flex justify-center">
                    {successMessage}
                  </p>
                )}
                {formError && (
                  <p className="text-red-500 text-xs">{formError}</p>
                )}
              </>
            )}
            <div className="flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
              >
                <path
                  d="M4.83344 8L5.77344 7.06L2.7201 4L5.77344 0.94L4.83344 -8.21774e-08L0.833438 4L4.83344 8Z"
                  fill="#74817F"
                />
              </svg>
              <Link to="/login">
                <p className="text-[#74817F] text-xs">Back to login</p>
              </Link>
            </div>
          </div>
        </form>
        <div className="fakeDecoy"></div>
      </div>
    </div>
  );
};

export default RetailPasswordReset;
