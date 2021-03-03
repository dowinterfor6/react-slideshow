import React from "react";
import Slider from "./components/Slider";
// Need to do this because of bundler
// import img1 from "./assets/images/sample-1.jpg";
// import img2 from "./assets/images/sample-2.jpg";

const App = () => {
  const images = [
    {
      url:
        "https://images.pexels.com/photos/2187622/pexels-photo-2187622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url:
        "https://images.pexels.com/photos/2187662/pexels-photo-2187662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url:
        "https://images.pexels.com/photos/5220130/pexels-photo-5220130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url:
        "https://images.pexels.com/photos/2131687/pexels-photo-2131687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    // { url: img1 },
    // { url: img2 },
    {
      url:
        "https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      url:
        "https://images.pexels.com/photos/2187603/pexels-photo-2187603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  // TODO: Timing function option
  const options = {
    width: 600, //px
    height: 400, //px
    perspective: 1000, //px, > width
    rows: 5,
    cols: 9,
    rowConfig: {
      fromTop: false, // bool, default: true
      delay: 100,
    },
    colConfig: {
      fromLeft: true, // bool, default: true
      delay: 100,
    },
    pauseOnBlur: true, //default: true
  };

  return (
    <div className="App">
      <Slider images={images} options={options} />
    </div>
  );
};

export default App;
