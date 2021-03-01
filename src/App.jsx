import React from "react";
import Slider from "./components/Slider";
// Need to do this because of bundler
import img1 from "./assets/images/sample-1.jpg";
import img2 from "./assets/images/sample-2.jpg";

const App = () => {
  const images = [
    { url: img1 },
    { url: img2 },
    {
      url:
        "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url:
        "https://images.pexels.com/photos/2187603/pexels-photo-2187603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  const options = {
    width: 600, //px
    height: 400, //px
    perspective: 1000, //px, > width
    xGrid: 5,
    yGrid: 5,
  };

  return (
    <div className="App">
      <Slider images={images} options={options} />
    </div>
  );
};

export default App;
