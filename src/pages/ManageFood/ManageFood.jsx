import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdManageHistory } from "react-icons/md";

const ManageFood = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const { data: foods, refetch } = useQuery({
    queryKey: ["manageFoods", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/createFood?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteFood = (food) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${food.food_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/createFood/${food._id}`).then((data) => {
          if (data.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Your request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className={`mt-20 ${foods?.length > 0 ? "mb-56" : "mb-36 md:mb-64 lg:mb-96"} `}>
      <Helmet>
        <title>FoodBuzz | Manage Food</title>
      </Helmet>
      {foods?.length > 0 ? (
        <>
          <div className="w-full p-3 lg:p-0 lg:w-1/2 mx-auto text-center mb-6">
            <h2 className="md:text-4xl text-2xl font-semibold text-blue-500">
              Manage Your Food Contributions
            </h2>
            <p className="text-gray-600 mt-4 text-[16px]">
              Here you can see all the food items you’ve added. Use the options
              to update or delete any item as needed.
            </p>
          </div>
          <div className="overflow-x-auto mt-10 md:mt-20 lg:mt-28 rounded-xl px-4">
            <table className="table">
              <thead>
                <tr className="md:text-[16px]">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Expired Date</th>
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
                    <td>{food.location}</td>
                    <td>{food.expired_date}</td>
                    <td className="flex items-center gap-5 mt-4">
                      <span
                        onClick={() => handleDeleteFood(food)}
                        className="text-red-700 cursor-pointer"
                      >
                        <RiDeleteBinLine size={23} />
                      </span>
                      <Link
                        to={`/updateFood/${food._id}`}
                        className="text-blue-400"
                      >
                        <FiEdit size={20} />
                      </Link>

                      <Link
                        to={`/foodManage/${food._id}`}
                        className="text-blue-400"
                      >
                        <MdManageHistory size={23} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3 className="md:text-3xl font-semibold flex items-center justify-center text-xl my-44">
         You haven't added food yet.
        </h3>
      )}
    </div>
  );
};

export default ManageFood;
