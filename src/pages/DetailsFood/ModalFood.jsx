import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ModalFood = ({ food }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, control, handleSubmit } = useForm();

  const originalDate = new Date();
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = originalDate.toLocaleDateString("en-GB", options);

  const {
    _id,
    status,
    donator_name,
    donator_email,
    expired_date,
    location,
    food_name,
    food_img,
  } = food;

  const onSubmit = async (data) => {
    const requestInfo = {
      ...data,
      food_name,
      food_img,
      food_request_id: _id,
      location,
      status,
      donator_email,
      donator_name,
      requester_email: user?.email,
      request_date: formattedDate,
      expired_date,
      requester_name: user?.displayName,
      requester_img: user?.photoURL,
    };

    try {
      const res = await axiosSecure.post("/requestFood", requestInfo);
      if (res?.data?.insertedId) {
        navigate("/availableFoods");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Request Sent Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <dialog id="request-modal" className="modal">
        <div className="modal-box w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
            onClick={() => document.getElementById("request-modal").close()}
          >
            ✕
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Request Food
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Food Name and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  value={food_name || ""}
                  readOnly
                  {...register("food_name")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Donation Money</span>
                </label>
                <input
                  required
                  type="number"
                  placeholder="Enter donation amount"
                  {...register("donate_money")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Donator Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donator Name</span>
                </label>
                <input
                  type="text"
                  value={donator_name || ""}
                  readOnly
                  {...register("donator_name")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donator Email</span>
                </label>
                <input
                  type="email"
                  value={donator_email || ""}
                  readOnly
                  {...register("donator_email")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Requester Email and Request Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  {...register("requester_email")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Request Date</span>
                </label>
                <input
                  type="text"
                  value={formattedDate || ""}
                  readOnly
                  {...register("request_date")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Pick-Up Location and Expired Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pick-Up Location</span>
                </label>
                <input
                  type="text"
                  value={location || ""}
                  readOnly
                  {...register("location")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Expired Date</span>
                </label>
                <input
                  type="text"
                  value={expired_date || ""}
                  readOnly
                  {...register("expired_date")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <label className="label">
              <span className="label-text">Food Image URL</span>
            </label>
            <input
              type="text"
              value={food_img || ""}
              readOnly
              {...register("food_img")}
              className="input input-bordered w-full"
            />

            <label className="label">
              <span className="label-text">Message</span>
            </label>
            <Controller
              name="food_des"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  required
                  placeholder="Write your message..."
                  className="textarea textarea-bordered w-full h-24"
                />
              )}
            />

            {/* Submit Button */}
            <button className="btn w-full text-white bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600">
              Send Request
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ModalFood;
