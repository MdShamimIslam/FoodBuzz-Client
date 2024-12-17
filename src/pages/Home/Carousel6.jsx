import { useEffect, useState } from "react";

export const Carousel6 = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const sliders = [
    {
      img: "https://i.ibb.co/jzBFk4n/Rustic-Honey-Cake-EXPS-THFM19-121544-B10-03-10b-22.jpg",
      title: "Nourish Your Body!",
      des: "The best organic food si grown without synthetic chemicals,nurturing soil health and animal welfare.Its fresher,tastier and support",
    },
    {
      img: "https://i.ibb.co/S7N5rsk/shutterstock-566591296.jpg",
      title: "Organic Foods and Vegetables",
      des: "By opting for organic,you prioritize nutrient-rich, chemical free produce and support sustainable farming practice.",
    },
    {
      img: "https://i.ibb.co/m9h40BH/istockphoto-1157591821-612x612.jpg",
      title: "Nourish Your Body!",
      des: "The best organic food si grown without synthetic chemicals,nurturing soil health and animal welfare.Its fresher,tastier and support",
    },
    {
      img: "https://i.ibb.co/cvNC19N/istockphoto-1407832840-612x612.jpg",
      title: "Organic Foods and Vegetables",
      des: "By opting for organic,you prioritize nutrient-rich, chemical free produce and support sustainable farming practice.",
    },
    {
      img: "https://i.ibb.co/bs0dfxc/percision-blog-header-junk-food-102323.jpg",
      title: "Nourish Your Body!",
      des: "The best organic food si grown without synthetic chemicals,nurturing soil health and animal welfare.Its fresher,tastier and support",
    },
   
    
  ];
  // if you don't want to change the slider automatically then you can just remove the useEffect
  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setCurrentSlider(
          currentSlider === sliders.length - 1 ? 0 : currentSlider + 1
        ),
      5000
    );
    return () => clearInterval(intervalId);
  }, [currentSlider]);

  return (
    <div className="flex flex-row-reverse justify-between">
      <div
        className="w-full h-72 sm:h-96 md:h-[540px] flex flex-col items-center justify-center gap-5 lg:gap-10 bg-cover bg-center before:absolute before:bg-black/50 before:inset-0 transform duration-1000 ease-linear rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${sliders[currentSlider].img})` }}
      >
        {/* text container here */}
        <div className="drop-shadow-lg text-white text-center px-5 md:2/3 w-5/6">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-3">
            {sliders[currentSlider].title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            {sliders[currentSlider].des}
          </p>
        </div>
      </div>
      {/* slider container */}
      <div className="flex flex-col justify-center items-center gap-3 p-2">
        {/* sliders */}
        {sliders.map((slide, inx) => (
          <img
            onClick={() => setCurrentSlider(inx)}
            key={inx}
            src={slide.img}
            className={`w-10 md:w-20 h-6 sm:h-8 md:h-12 bg-black/20 ${
              currentSlider === inx ? "border-2 border-black p-px" : ""
            } rounded-md md:rounded-lg box-content cursor-pointer`}
            alt={slide.title}
          />
        ))}
      </div>
    </div>
  );
};
