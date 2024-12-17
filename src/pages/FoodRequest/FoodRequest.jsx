import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FoodRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const { data: foods, refetch } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axiosSecure(`/requestFood?email=${user?.email}`);
      return res.data;
    },
  });

  const handleRemoveRequest = (food) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to remove ${food.food_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requestFood/${food._id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              text: "Your request has been removed.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className={`mt-20 ${foods?.length > 0 ? "mb-56" : "mb-36 md:mb-64 lg:mb-96"} `}>
      <Helmet>
        <title>FoodBuzz | Food Request</title>
      </Helmet>

      {foods?.length > 0 ? (
        <>
          <div className=" w-full lg:w-1/2 mx-auto text-center mb-6 p-3 lg:p-0">
            <h2 className="md:text-4xl text-2xl font-semibold text-blue-500">
              Your Sent Food Requests
            </h2>
            <p className="text-gray-600 mt-4 md:text-lg">
              Here’s a list of food items you’ve requested from others. Track
              the status of your requests and manage them as needed.
            </p>
          </div>
          <div className="overflow-x-auto mt-10 md:mt-20 lg:mt-28 rounded-xl px-4">
            <table className="table">
              <thead>
                <tr className="md:text-[16px]">
                  <th>Image</th>
                  <th>Food Name</th>
                  <th>Donar Name</th>
                  <th>Pick up Location</th>
                  <th>Expired Date</th>
                  <th>Request Date</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {foods?.map((food) => (
                  <tr key={food._id}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={food.food_img} alt="food-image" />
                        </div>
                      </div>
                    </td>
                    <td>{food.food_name}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="">{food.donator_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{food.location}</td>
                    <td>{food.expired_date}</td>
                    <td>{food.request_date}</td>
                    <td>${food.donate_money}</td>
                    <td>
                      {food.status === "Delivered" ? (
                        <button disabled className="btn btn-sm ">
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRemoveRequest(food)}
                          className="btn btn-sm bg-red-600 text-white"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3 className="md:text-3xl font-semibold flex items-center justify-center text-xl my-44">
          No food requests have been made yet.
        </h3>
      )}
    </div>
  );
};

export default FoodRequest;
