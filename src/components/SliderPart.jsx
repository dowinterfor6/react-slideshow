import React, { useEffect, useRef, useState } from "react";

const SliderPart = ({
  images,
  rotation,
  backgroundPosition,
  width,
  height,
}) => {
  const [isFrontImage, setIsFrontImage] = useState(true);

  useEffect(() => {
    setIsFrontImage(!isFrontImage);
  }, [rotation]);

  const { x, y } = backgroundPosition;
  let frontImageUrl, backImageUrl;

  if (isFrontImage) {
    frontImageUrl = images[0].url;
    backImageUrl = images[1].url;
  } else {
    frontImageUrl = images[1].url;
    backImageUrl = images[0].url;
  }

  const frontStyle = {
    backgroundImage: `url(${frontImageUrl})`,
    backgroundPosition: `-${x}px -${y}px`,
    backgroundSize: `${width}px ${height}px`,
  };

  const backStyle = {
    backgroundImage: `url(${backImageUrl})`,
    backgroundPosition: `-${x}px -${y}px`,
    backgroundSize: `${width}px ${height}px`,
  };

  return (
    <div className="slider" style={{ transform: `rotateY(${rotation}deg)` }}>
      <div className="card front" style={frontStyle}></div>
      <div className="card back" style={backStyle}></div>
    </div>
  );
};

export default SliderPart;
