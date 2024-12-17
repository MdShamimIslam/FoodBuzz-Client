import React from "react";
import burger from "../../assets/images/burger.jpg";
import { Link } from "react-router-dom";

const FoodSlider = () => {
  return (
    <div className="mt-12 md:mt-24  w-full">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={burger} className="w-full rounded-lg shadow-2xl " />
          <div className="flex justify-center mt-4 md:mt-6 lg:mt-0">
            <div>
              <h1 className="md:text-4xl text-2xl font-bold ">Burger guru!</h1>
              <p className="py-4 md:w-3/4 text-lg">
                A burger is a patty of ground beef grilled and placed between t
                wo halves of a bun. Slices of raw onion, lettuce, bacon,
                mayonnaise, and other ingredients add flavor.
              </p>
              <Link to='/availableFoods'>
              <button className="btn text-white bg-gradient-to-r from-sky-500 to-purple-500 text-[16px]">Let's see the Food</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSlider;
