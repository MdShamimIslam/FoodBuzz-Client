import { useLoaderData } from "react-router-dom";
import ModalFood from "./ModalFood";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../utils/axiosPublic";

const DetailsFood = () => {
  const food = useLoaderData();
  const {
    _id,
    donator_img,
    donator_name,
    expired_date,
    food_Des,
    food_img,
    food_name,
    location,
    quantity
  } = food;

  const { data: reqFood = {}, isLoading } = useQuery({
    queryKey: ["reqFood", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reqFood/${_id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-36">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="my-16 p-4">
      <Helmet>
        <title>FoodBuzz | Details Food</title>
      </Helmet>
      <div className="card lg:w-1/2 md:h-[700px] bg-base-100 shadow-2xl mx-auto">
        <figure>
          <img
            src={food_img}
            className="w-full h-[200px] md:h-[300px]"
            alt="food-image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{food_name}</h2>
          <p>{food_Des}</p>
          <p className="mt-3">
            Number of person to be served :
            <span className="font-semibold text-cyan-500">{quantity}</span>
          </p>
          <p>Pick Location : {location}</p>
          <p className=" text-pink-500">Expired Date : {expired_date}</p>
          <div className="my-4 flex items-center gap-4">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={donator_img} />
              </div>
            </div>
            <div>
              <p className="font-semibold">{donator_name}</p>
              <p>{location}</p>
            </div>
          </div>
          <div>
            {reqFood && reqFood?.status === "Delivered" ? (
              <button
                disabled
                onClick={() =>
                  document.getElementById("request-modal").showModal()
                }
                className="btn text-white  w-full"
              >
                Request Food
              </button>
            ) : (
              <button
                onClick={() =>
                  document.getElementById("request-modal").showModal()
                }
                className="btn text-white bg-gradient-to-r from-sky-500 to-purple-500 w-full"
              >
                Request Food
              </button>
            )}
          </div>
          <ModalFood food={food}></ModalFood>
        </div>
      </div>
    </div>
  );
};

export default DetailsFood;
