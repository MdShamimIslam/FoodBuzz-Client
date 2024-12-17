import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateFood = () => {
  const food = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    _id,
    quantity,
    expired_date,
    location,
    food_name,
    food_Des,
    food_img,
  } = food;

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { quantity, expired_date, location, food_name, food_Des, food_img } =
      data;
    const quantityInt = parseInt(quantity);
    const foodInfo = {
      food_name,
      food_img,
      food_Des,
      quantity: quantityInt,
      location,
      expired_date,
    };
    axiosSecure.put(`/createFood/${_id}`,foodInfo)
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          navigate("/manageFood");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="my-16 w-4/5 mx-auto">
      <Helmet>
        <title>FoodBuzz | Update Food</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Food Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={food_name}
              className="input input-bordered"
              {...register("food_name")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Food Image URL</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={food_img}
              className="input input-bordered"
              {...register("food_img")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Food Quantity</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={quantity}
              className="input input-bordered"
              {...register("quantity")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Pickup Location</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={location}
              className="input input-bordered"
              {...register("location")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Expired Date</span>
            </div>
            <input
              type="date"
              placeholder="Type here"
              defaultValue={expired_date}
              className="input input-bordered"
              {...register("expired_date")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Food Description</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              defaultValue={food_Des}
              className="input input-bordered"
              {...register("food_Des")}
              required
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button className=" mt-8 btn text-white bg-gradient-to-r from-sky-500 to-purple-500 w-1/2 md:w-1/3">
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;
