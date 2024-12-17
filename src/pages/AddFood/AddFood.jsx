import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    const { quantity, expired_date, location, food_name, food_Des, food_img } =
      data;
    const foodInfo = {
      donator_name: user?.displayName,
      donator_img: user?.photoURL,
      donator_email: user?.email,
      quantity: parseInt(quantity),
      location,
      expired_date,
      food_name,
      food_img,
      food_Des,
      status: "Available",
    };

    try {
      const res = await axiosSecure.post("/createFood", foodInfo);
      if (res?.data?.insertedId) {
        reset();
        navigate("/availableFoods")
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Food Added Successfully",
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
    <div className="mt-12 md:mt-16 lg:mt-24 mb-32 w-4/5 mx-auto">
      <Helmet>
        <title>FoodBuzz | Add Food</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="form-control w-full">
            <div className="label">
              <span>Food Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register("food_name")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span>Food Image URL</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register("food_img")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span>Food Quantity</span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered"
              {...register("quantity")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span>Pickup Location</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register("location")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span>Expired Date</span>
            </div>
            <input
              type="date"
              placeholder="Type here"
              className="input input-bordered"
              {...register("expired_date")}
              required
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span>Food Description</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered"
              {...register("food_Des")}
              required
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button className=" mt-8 btn text-[16px] text-white bg-gradient-to-r from-sky-500 to-purple-500 w-1/2 md:w-1/3">
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
