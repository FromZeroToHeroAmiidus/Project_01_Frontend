import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EyeIconRender from "../assets/icons/EyeIconRender";
import * as API from "../api/Api";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePassword: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [hiddenSet, setHiddenSet] = useState("hidden");
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  const setEyeStatus = () => {
    setHiddenSet(hiddenSet === "hidden" ? "" : "hidden");
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from current password"
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
        "Password must contain at least one capital letter, one lowercase letter, one symbol, one number, and be at least 8 characters long"
      ),
    confirmNewPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setFormMessage(null); // Clear previous messages
        const response = await API.updatePassword(values);
        //  console.log(response);

        if (!response.ok) {
          if (response.status !== 200) throw new Error(response.data.message);
        }

        setFormMessage("You successfully changed your password");
        setMessageType("success");
      } catch (error: any) {
        console.error("Password update failed:", error.message);
        setFormMessage("Password update failed: " + error.message);
        setMessageType("error");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 mt-[10%]">
      <div className="bg-black opacity-30 fixed inset-0 z-0"></div>
      <div className="bg-white w-[533px] p-4 rounded-2xl z-50 flex flex-col gap-4">
        <div className="title text-2xl font-bold">Change password</div>
        <form
          className="inner flex flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="currentPassword">Current password</label>
            <div className="relative flex items-center">
              <input
                type={hiddenSet === "" ? "text" : "password"}
                id="currentPassword"
                {...formik.getFieldProps("currentPassword")}
                className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none font-bold ${
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <div className="absolute right-3" onClick={() => setEyeStatus()}>
                <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
              </div>
            </div>
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <p id="currentPasswordError" className="text-red-500 text-xs">
                {formik.errors.currentPassword}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="newPassword">New password</label>
            <div className="relative flex items-center">
              <input
                type={hiddenSet === "" ? "text" : "password"}
                id="newPassword"
                {...formik.getFieldProps("newPassword")}
                className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none font-bold ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <div className="absolute right-3" onClick={() => setEyeStatus()}>
                <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
              </div>
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p id="newPasswordError" className="text-red-500 text-xs">
                {formik.errors.newPassword}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="confirmNewPassword">Repeat new password</label>
            <div className="relative flex items-center">
              <input
                type={hiddenSet === "" ? "text" : "password"}
                id="confirmNewPassword"
                {...formik.getFieldProps("confirmNewPassword")}
                className={`py-2 pl-3 pr-10 rounded-2xl border-[1px] focus:border-logoYellow w-full focus:outline-none font-bold ${
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <div className="absolute right-3" onClick={() => setEyeStatus()}>
                <EyeIconRender fill={hiddenSet} focused={isFocusedPassword} />
              </div>
            </div>
            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <p id="confirmNewPasswordError" className="text-red-500 text-xs">
                {formik.errors.confirmNewPassword}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-2xl font-bold bg-[#EDF4F2] hover:bg-gray-300 focus:outline-none"
              onClick={() => {
                setFormMessage(null); // Clear previous messages on button click
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
              onClick={() => setFormMessage(null)} // Clear previous messages on button click
            >
              Save changes
            </button>
          </div>
          {formMessage && (
            <p
              className={`text-xs ${
                messageType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {formMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
