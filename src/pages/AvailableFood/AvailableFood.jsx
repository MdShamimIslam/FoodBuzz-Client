import React, { useRef, useState } from "react";
import FoodCard from "../FoodsCard/FoodCard";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../utils/axiosPublic";

const AvailableFood = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const { loading } = useAuth();
  const [expiredDate, setExpiredDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: { foods, totalPages } = {} } = useQuery({
    queryKey: ["foods", search, expiredDate, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/foods?search=${search}&sortOrder=${expiredDate}&page=${currentPage}`
      );
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center my-36">
        <div className="w-10 h-10 animate-[spin_2s_linear_infinite] rounded-full border-8 border-dotted border-sky-600"></div>
      </div>
    );
  }

  const handleSearch = () => {
    setSearch(searchRef.current.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={`mt-20 ${foods?.length > 0 ? "mb-56" : "mb-36 md:mb-64 lg:mb-96"} `}>
      <Helmet>
        <title>FoodBuzz | Available Foods</title>
      </Helmet>
      <div className="flex flex-col items-center md:flex-row gap-6 justify-between">
        <div className="join ml-[-10px] md:ml-4 flex-col w-3/4 md:w-[320px] lg:w-[400px]">
          Search now by food name
          <label className="input input-bordered flex items-center gap-2 mt-4">
            <input
              type="text"
              ref={searchRef}
              onChange={handleSearch}
              className="grow"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <label className="form-control w-full max-w-xs mr-4">
          <div className="label">
            <span className="label-text">Filter by Expired Date</span>
          </div>
          <select
            defaultValue={"default"}
            className="select select-bordered"
            onChange={(e) => setExpiredDate(e.target.value)}
          >
            <option disabled value={"default"}>
              Choose one
            </option>
            <option value="desc">High to low</option>
            <option value="asc">Low to high</option>
          </select>
        </label>
      </div>
      {foods?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 p-4">
            {foods?.map((food) => (
              <FoodCard key={food._id} food={food}></FoodCard>
            ))}
          </div>
          <div className="flex justify-center mt-10 items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`btn btn-sm ${
                currentPage === 1 ? "btn-disabled opacity-50" : ""
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`btn btn-sm ${
                  currentPage === index + 1
                    ? "btn-active bg-sky-600 text-white"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`btn btn-sm ${
                currentPage === totalPages ? "btn-disabled opacity-50" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <h3 className="md:text-3xl font-semibold flex items-center justify-center text-xl mt-28">
          No food found with the given search criteria.
        </h3>
      )}
    </div>
  );
};

export default AvailableFood;
