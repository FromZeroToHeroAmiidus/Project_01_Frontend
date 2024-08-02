import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/logo.png";
import EyeIconRender from "../../../assets/icons/EyeIconRender";
import * as API from "../../../api/Api";
import { Link } from "react-router-dom";

const RetailSignup: React.FC = () => {
  const [hiddenSet, setHiddenSet] = useState("hidden");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const setEyeStatus = () => {
    setHiddenSet(hiddenSet === "hidden" ? "" : "hidden");
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Name is required")
      .matches(/^[A-Z][a-z]*$/, "First letter must be capital"),
    lastName: Yup.string()
      .required("Surname is required")
      .matches(/^[A-Z][a-z]*$/, "First letter must be capital"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
        "Password must contain at least one capital letter, one lowercase letter, one symbol, one number, and be at least 8 characters long"
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "null",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await API.signup(values);
        //console.log(response);

        if (!response.ok) {
          // Handle different status codes as needed
          if (response.status === 403 || response.status === 400)
            // tle loh dodam še če je backend offline koda
            throw new Error(response.data.message);
        }

        alert("Signup successful!");
        window.location.href = "/login";
        // Handle successful signup logic here
      } catch (error: any) {
        //  console.error("Signup failed:", error.message);
        // alert("Error : " + error.message);
        if (error.response) {
          const errorMessage = error.response.data.message;
          setFormError(`Signup failed: ${errorMessage}`);
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
        <img className="max-w-none" src={logo} alt="logo.png" />
      </div>
      <form
        className="FormWarpper flex flex-col w-full gap-[64px]"
        onSubmit={formik.handleSubmit}
      >
        <div className="WelcomeText flex flex-col gap-2 items-center">
          <p className="font-bold text-[32px]">Hello!</p>
          <p>Please enter your details</p>
        </div>

        <div className="FormIndeed flex flex-col gap-4">
          <div className="BrezGumba  flex flex-col gap-4">
            <div className="itemTitle flex gap-[17px]">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  {...formik.getFieldProps("firstName")}
                  className={`py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none w-full font-bold ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <p id="nameError" className="text-red-500 text-xs">
                    {formik.errors.firstName}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  placeholder="Surname"
                  {...formik.getFieldProps("lastName")}
                  className={`py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none w-full font-bold ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <p id="surnameError" className="text-red-500 text-xs">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="Desc flex flex-col gap-2">
              <label className="" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
                className={`flex-1 py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none font-bold ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
              ></input>
              {formik.touched.email && formik.errors.email ? (
                <p id="emailError" className="text-red-500 text-xs">
                  {formik.errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="password">Password</label>
              <div className="relative flex items-center">
                <input
                  type={hiddenSet === "" ? "text" : "password"}
                  id="password"
                  {...formik.getFieldProps("password")}
                  className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none font-bold ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <div
                  className="absolute right-3"
                  onClick={() => setEyeStatus()}
                >
                  <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p id="passwordError" className="text-red-500 text-xs">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="confirmPassword">Repeat password</label>
              <div className="relative flex items-center">
                <input
                  type={hiddenSet === "" ? "text" : "password"}
                  id="confirmPassword"
                  {...formik.getFieldProps("confirmPassword")}
                  className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none font-bold ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                />
                <div
                  className="absolute right-3"
                  onClick={() => setEyeStatus()}
                >
                  <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
                </div>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p id="confirmPasswordError" className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
          >
            Sign up
          </button>
          {formError && <p className="text-red-500 text-xs">{formError}</p>}
        </div>
      </form>
      <div className="Konec flex gap-1">
        <p>Already have an account?</p>
        <Link to="/login">
          <p className="font-bold">Log in</p>
        </Link>
      </div>
    </div>
  );
};

export default RetailSignup;
