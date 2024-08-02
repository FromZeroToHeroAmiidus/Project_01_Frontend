import React, { useEffect, useState } from "react";
import ClockIconRender from "../../../assets/icons/ClockIconRender";
import steamDeck from "../../../assets/images/mikrofon.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as API from "../../../api/Api";
import { findOneAuction } from "../../../utils/auctionUtils";
import { AuctionDataType } from "../../../models/auctions";

import { ClipLoader } from "react-spinners";
import auctionStore from "../../../stores/auction.store";
import { AuctionFormValues } from "../../../models/auctions";

interface EditAuctionProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditAuction: React.FC<EditAuctionProps> = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;

  const [isFocusedDate, setIsFocusedDate] = useState(false);

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(steamDeck);

  const [item, setItem] = useState<AuctionDataType | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<File | null>(null);

  const [initialValues, setInitialValues] = useState<AuctionFormValues>({
    title: "",
    description: "",
    startingBid: "",
    endTime: null,
    currentBid: 0,
    image: "null",
  });

  // Let's populate our edit form

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const auctionItem = await findOneAuction(Number(id));
        console.log(auctionItem);

        if (!auctionItem) {
          throw new Error("Item not found");
        }

        setItem(auctionItem);

        setInitialValues({
          title: auctionItem.title || "",
          description: auctionItem.description || "",
          endTime: auctionItem.endTime ? new Date(auctionItem.endTime) : null,
        });

        setEndDate(new Date(auctionItem.endTime));
        // preview

        setPreviewUrl(
          import.meta.env.VITE_API_URL + "/files/" + auctionItem.image
        );
      } catch (error: any) {
        console.error("Error fetching auction item:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Delay of 1 second
      }
    };

    fetchData();
  }, [id]);

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

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(16, "Title must be 16 characters or less")
      .required("Required"),
    description: Yup.string().required("Required"),
    endTime: Yup.date().required("Required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setItem((prevItem) => {
      if (!prevItem) return prevItem; // Handle the case where item is null
      return {
        ...prevItem,
        [id]: value,
      };
    });
  };

  const handleSubmit = async (values: AuctionFormValues) => {
    try {
      const formattedEndDate = new Date(values.endTime!);
      formattedEndDate.setHours(23, 59, 59);

      const auctionData = {
        title: values.title,
        description: values.description,
        endTime: formattedEndDate,
      };

      const response = await API.editAuction(auctionData, id);
      console.log("API response:", response);

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        await API.uploadAuctionImage(formData, id);
      }

      auctionStore.fetchMyAuctions();
    } catch (error) {
      console.error("Error editing auction:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
      <div className="bg-white w-[533px] p-4 rounded-2xl z-50 flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[700px]">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <>
            <div className="title text-2xl font-bold">Edit auction</div>
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
                            //setImageSet(false);
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
                          aria-describedby="imageError"
                        />
                      </label>
                    )}
                  </div>
                  {imageError && (
                    <div className="text-red-500 text-sm" id="imageError">
                      {imageError}
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="title">Title</label>
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Write item name here"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldValue("title", e.target.value);
                        }}
                        value={item?.title}
                        className="py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none"
                        aria-describedby="titleError"
                        autoComplete="off"
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
                        value={item?.description}
                        // onChange={handleChange}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleChange(e);
                          setFieldValue("description", e.target.value);
                        }}
                        className="h-[155px] py-2 px-3 rounded-2xl border-[1px] focus:border-logoYellow focus:outline-none"
                        aria-describedby="descriptionError"
                        autoComplete="off"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                        id="descriptionError"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="endTime">End date</label>
                      <div
                        className={`py-2 px-3 rounded-2xl border-[1px] flex items-center ${
                          isFocusedDate
                            ? "border-logoYellow"
                            : "border-bidBorder"
                        }`}
                      >
                        {/* <div className="date-icon flex justify-between">

                    </div> */}
                        <div className="datePicker flex-1">
                          <DatePicker
                            selected={endDate}
                            onChange={(date: Date | null) => {
                              setEndDate(date);
                              setItem;
                              setFieldValue("endTime", date);
                              // {
                              //   handleChange;
                              // }
                            }}
                            onFocus={() => setIsFocusedDate(true)}
                            onBlur={() => setIsFocusedDate(false)}
                            dateFormat="dd/MM/yyyy"
                            className=" block w-[215%] focus:outline-none"
                            placeholderText="End date"
                            aria-describedby="endTimeError"
                            minDate={new Date()}
                          />
                        </div>

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

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-2xl font-bold bg-[#EDF4F2] hover:bg-gray-300 focus:outline-none"
                      onClick={onClose}
                    >
                      Discard changes
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-2xl font-bold bg-black text-white focus:outline-none"
                    >
                      Edit auction
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default EditAuction;
