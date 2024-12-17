import { useQuery } from "@tanstack/react-query";
import FoodCard from "./FoodCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { axiosPublic } from "../../utils/axiosPublic";

const Foods = () => {
  const { data: foods } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/limitFoods");
      return res.data;
    },
  });
  
  return (
    <div className="mt-16 md:mt-24">
      <Helmet>
        <title>FoodBuzz | Home</title>
      </Helmet>
      <div className="w-full lg:w-1/2 mx-auto my-8 p-2 lg:p-0">
        <h3 className="md:text-4xl text-2xl font-bold text-center">
          Our Featured Foods
        </h3>
        <p className="mt-4 text-lg text-center">
          Explore a curated selection of delicious and unique foods shared by
          our community, ready for you to request or enjoy!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {foods?.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/availableFoods">
          <button className="btn text-[16px] text-white w-[300px] mt-8 bg-gradient-to-r from-orange-500 to-blue-500">
            Show All Food
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Foods;
