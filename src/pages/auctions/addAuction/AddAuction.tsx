import React, { useState } from "react";
import EurIconRender from "../../../assets/icons/EurIconRender";
import ClockIconRender from "../../../assets/icons/ClockIconRender";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as API from "../../../api/Api";
import auctionStore from "../../../stores/auction.store";

interface AddAuctionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuctionFormValues {
  title: string;
  description: string;
  startingBid: string;
  endTime: Date | null;
  currentBid: number;
  image: string | null;
}

const AddAuction: React.FC<AddAuctionProps> = ({ isOpen, onClose }) => {
  const [isFocusedPrice, setIsFocusedPrice] = useState(false);
  const [isFocusedDate, setIsFocusedDate] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const initialValues: AuctionFormValues = {
    title: "",
    description: "",
    startingBid: "",
    endTime: null,
    currentBid: 0,
    image: "null",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(16, "Title must be 16 characters or less")
      .required("Required"),
    description: Yup.string().required("Required"),
    startingBid: Yup.number()
      .positive("Price must be greater than 0")
      .required("Required"),
    endTime: Yup.date().required("Required"),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Image must be under 5MB.");
        return;
      }

      const img = new Image();
      img.onload = () => {
        if (img.width > 2000 || img.height > 2000) {
          setImageError("Image dimensions must be within 2000x2000px.");
        } else {
          setImage(file);
          setPreviewUrl(URL.createObjectURL(file));
          setImageError(null);
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (
    values: AuctionFormValues,
    { resetForm }: FormikHelpers<AuctionFormValues>
  ) => {
    if (!image) {
      setImageError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Format the end date to include time until 23:59:59
      const formattedEndDate = new Date(values.endTime!);
      formattedEndDate.setHours(23, 59, 59);

      const auctionData = { ...values, endTime: formattedEndDate };
      const response = await API.postAuction(auctionData);

      await API.uploadAuctionImage(formData, response.data.id);

      setSuccessMessage("You successfully posted your auction!");
      resetForm();
      setImage(null);
      setPreviewUrl(null);
      setEndDate(null); // Reset the end date
      await auctionStore.fetchMyAuctions();
    } catch (error) {
      console.error("Error posting auction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-30 z-0"
        onClick={onClose}
      ></div>
      <div className="bg-white w-[533px] p-4 rounded-2xl z-50 flex flex-col gap-4">
        <div className="text-2xl font-bold">Add auction</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div
                className={`AddImg h-[168px] rounded-2xl ${
                  previewUrl
                    ? "relative flex justify-end"
                    : "p-8 flex justify-center items-center gap-2"
                } bg-[#F6F6F4] z-10`}
              >
                {previewUrl ? (
                  <>
                    <div
                      className="absolute py-3 px-3 m-3 rounded-2xl bg-black cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setPreviewUrl(null);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.00016 10.6667C1.00016 11.4 1.60016 12 2.3335 12H7.66683C8.40016 12 9.00016 11.4 9.00016 10.6667V2.66667H1.00016V10.6667ZM2.3335 4H7.66683V10.6667H2.3335V4ZM7.3335 0.666667L6.66683 0H3.3335L2.66683 0.666667H0.333496V2H9.66683V0.666667H7.3335Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        borderRadius: 16,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </>
                ) : (
                  <label
                    className="
                      py-2 px-4
                      border-[2px] border-black
                      rounded-[16px]
                      flex items-center justify-center font-bold z-10 cursor-pointer
                    "
                  >
                    Add image
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              {imageError && (
                <div className="text-red-500 text-sm">{imageError}</div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Write item name here"
                    className="py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none"
                    aria-describedby="titleError"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                    id="titleError"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Write description here..."
                    className="h-[155px] py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none"
                    aria-describedby="descriptionError"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                    id="descriptionError"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="startingBid">Starting price</label>
                    <div
                      className={`py-2 px-3 rounded-2xl border-[1px] flex items-center ${
                        isFocusedPrice
                          ? "border-logoYellow"
                          : "border-bidBorder"
                      }`}
                    >
                      <Field
                        type="number"
                        id="startingBid"
                        name="startingBid"
                        placeholder="Price"
                        className="flex-1 block w-full focus:outline-none"
                        onFocus={() => setIsFocusedPrice(true)}
                        onBlur={() => setIsFocusedPrice(false)}
                        aria-describedby="startingBidError"
                      />
                      <EurIconRender fill={isFocusedPrice ? "black" : "gray"} />
                    </div>
                    <ErrorMessage
                      name="startingBid"
                      component="div"
                      className="text-red-500 text-sm"
                      id="startingBidError"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="endTime">End date</label>
                    <div
                      className={`py-2 px-3 rounded-2xl border-[1px] flex items-center ${
                        isFocusedDate ? "border-logoYellow" : "border-bidBorder"
                      }`}
                    >
                      <DatePicker
                        id="endTime"
                        selected={endDate}
                        onChange={(date) => {
                          setEndDate(date);
                          setFieldValue("endTime", date);
                        }}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="dd.mm.yyyy"
                        className="flex-1 block w-full focus:outline-none"
                        onFocus={() => setIsFocusedDate(true)}
                        onBlur={() => setIsFocusedDate(false)}
                        minDate={new Date()}
                        aria-describedby="endTimeError"
                        autoComplete="off"
                      />
                      <ClockIconRender
                        fill={isFocusedDate ? "black" : "gray"}
                      />
                    </div>
                    <ErrorMessage
                      name="endTime"
                      component="div"
                      className="text-red-500 text-sm"
                      id="endTimeError"
                    />
                  </div>
                </div>
              </div>

              {successMessage && (
                <div className="text-green-500 font-bold">{successMessage}</div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-2xl font-bold bg-[#EDF4F2] hover:bg-gray-300 focus:outline-none"
                  onClick={() => {
                    onClose();
                    setSuccessMessage("");
                    setEndDate(null); // Reset the end date on cancel
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl font-bold bg-logoYellow hover:bg-addAuctionHover focus:outline-none"
                >
                  Start auction
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAuction;
