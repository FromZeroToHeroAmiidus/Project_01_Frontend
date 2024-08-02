import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";
import EyeIconRender from "../../../assets/icons/EyeIconRender";
import * as API from "../../../api/Api";
import authStore from "../../../stores/auth.store";
import userStore from "../../../stores/userID.store";
import fullUserStore from "../../../stores/fullUser.store";
import axios from "axios";
import { FullUserInfoType } from "../../../models/auth";
import { Link } from "react-router-dom";

const RetailLogin: React.FC = () => {
  const [hiddenSet, setHiddenSet] = React.useState("hidden");
  const [isFocusedPassword, setIsFocusedPassword] = React.useState(false);
  const [formError, setFormError] = React.useState("");
  const apiUrl: string = import.meta.env.VITE_API_URL;

  const setEyeStatus = () => {
    setHiddenSet(hiddenSet === "hidden" ? "" : "hidden");
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    //   "Password must contain at least one capital letter, one lowercase letter, one symbol, one number, and be at least 8 characters long"
    // ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await API.login(values);
        //console.log(response.data);
        // alert("Login successful!");

        if (!response.ok) {
          // Handle different status codes as needed
          if (
            // Should have these in separate file but oh well ... newbie excuse
            response.status === 403 ||
            response.status === 400 ||
            response.status === 401
          )
            // tle loh dodam še če je backend offline koda
            throw new Error(response.data.message);
        }

        authStore.login(response.data);

        const userIdResponse = await axios.get(`${apiUrl}/auth/check`, {
          withCredentials: true,
        });

        userStore.login(userIdResponse.data);

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.access_token;
        const userResponse = await axios.get(`${apiUrl}/users/me`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const filterUserData = (data: any): FullUserInfoType => {
          return {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
        };

        fullUserStore.login(filterUserData(userResponse.data));
        window.location.href = "/me/myauctions";
        console.log("Redirected to /me/myauctions");
      } catch (error: any) {
        console.error("Login failed:", error.message);
        if (error.response) {
          const errorMessage = error.response.data.message;
          setFormError(`Login failed: ${errorMessage}`);
        } else {
          if (error.message.includes("Cannot read properties of undefined"))
            setFormError(
              "Login failed: Our servers are under maintenance. Please try later."
            );
          else setFormError("Login failed: " + error.message);
        }
      }
    },
  });

  return (
    <div className="Wapper w-[448px] h-[1000px] rounded-[32px] px-8 py-16 flex flex-col justify-between items-center bg-white">
      <div className="bg-logoYellow rounded-full w-16 h-16 flex items-center justify-center gap-4">
        <img className="max-w-none" src={logo} alt="logo" />
      </div>
      <form
        className="FormWarpper flex flex-col w-full gap-[64px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="WelcomeText flex flex-col gap-2 items-center">
          <p className="font-bold text-[32px]">Welcome back!</p>
          <p>Please enter your details</p>
        </div>

        <div className="FormIndeed flex flex-col gap-4 w-full">
          <div className="BrezGumba flex flex-col gap-4">
            <div className="Desc flex flex-col gap-2">
              <label htmlFor="email" className="font-bold">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                aria-describedby="emailError"
                placeholder="Your email"
                {...formik.getFieldProps("email")}
                className={`flex-1 py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              />
              {formik.touched.email && formik.errors.email ? (
                <p id="emailError" className="text-red-500 text-xs">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={hiddenSet === "" ? "text" : "password"}
                  id="password"
                  aria-describedby="passwordError"
                  placeholder="Your password"
                  {...formik.getFieldProps("password")}
                  className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <div className="absolute right-3" onClick={setEyeStatus}>
                  <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p id="passwordError" className="text-red-500 text-xs">
                  {formik.errors.password}
                </p>
              ) : null}
              <Link to="/forgot-password">
                <p className="text-xs flex justify-end text-[#74817F]">
                  Forgot password?
                </p>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
          >
            Login
          </button>
          {formError && <p className="text-red-500 text-xs">{formError}</p>}
        </div>
      </form>
      <div className="Konec flex gap-1">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <p className="font-bold">Sign Up</p>
        </Link>
      </div>
    </div>
  );
};

export default RetailLogin;
