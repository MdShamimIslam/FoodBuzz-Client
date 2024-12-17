import React from "react";
import { Helmet } from "react-helmet-async";
import FoodSlider from "../FoodSlider/FoodSlider";
import Foods from "../FoodsCard/Foods";
import { Carousel6 } from "./Carousel6";
import { Accordion1 } from "./Accordion1";

const Home = () => {
  return (
    <div className="my-16">
      <Helmet>
        <title>FoodBuzz | Home</title>
      </Helmet>
      <Carousel6></Carousel6>
      <Foods></Foods>
      <FoodSlider></FoodSlider>
      <Accordion1></Accordion1>
    </div>
  );
};

export default Home;
