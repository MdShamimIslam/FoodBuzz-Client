import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const SingleManageFood = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: foods = [], refetch } = useQuery({
    queryKey: ["requestFoods"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestFood/${id}`);
      return res.data;
    },
  });

  const handleStatusChange = (id) => {
    axiosSecure.patch(`/requestFood/${id}`, { status: "Delivered" })
      .then((data) => {
        if (data?.data?.success == true) {
          refetch();
          Swal.fire({
            title: "Updated!",
            text: "Food Delivered Succesfully.",
            icon: "success",
          });
        }
      });
  };

  return (
    <div className="mt-20 mb-60">
      <Helmet>
        <title>FoodBuzz | Manage Food</title>
      </Helmet>
      {foods?.length > 0 ? (
        <>
          <div className=" w-full lg:w-1/2 mx-auto text-center mb-6 p-3 lg:p-0">
            <h2 className="md:text-4xl text-2xl font-semibold text-blue-500">
              Requests for Your Shared Food
            </h2>
            <p className="text-gray-600 mt-4 md:text-lg">
              Below is the list of users who have requested food you added. You
              can view their details and take necessary actions.
            </p>
          </div>
          <div className="overflow-x-auto mt-10 md:mt-20 lg:mt-28 rounded-xl px-4">
            <table className="table">
              <thead>
                <tr className="text-[16px]">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Food Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {foods?.map((food) => (
                  <tr key={food._id}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={food.requester_img} alt="food-image" />
                        </div>
                      </div>
                    </td>
                    <td>{food.requester_name}</td>
                    <td>{food.requester_email}</td>
                    <td>{food.request_date}</td>
                    <td>{food.food_name}</td>
                    <td>
                      <button
                        onClick={() => handleStatusChange(food._id)}
                        className="btn btn-xs"
                        disabled={food.status === "Delivered"}
                      >
                        {food.status}
                      </button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h3 className="md:text-3xl font-semibold flex items-center justify-center text-xl my-44">
          No one has requested your food yet.
        </h3>
      )}
    </div>
  );
};

export default SingleManageFood;
