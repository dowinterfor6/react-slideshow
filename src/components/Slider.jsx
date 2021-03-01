import React, { useEffect, useRef, useState } from "react";
import SliderPart from "./SliderPart";

const Slider = ({ images, options }) => {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef();
  const { width, height, xGrid, yGrid, perspective } = options;
  const [currSlideshowIdx, setCurrSlideshowIdx] = useState(0);
  const currSlideshowIdxRef = useRef();

  const gridTemplateColumns = `repeat(${xGrid}, 1fr)`;
  const gridTemplateRows = `repeat(${yGrid}, 1fr)`;

  // TODO: Images should rotate
  const sliderParts = [];
  for (let i = 0; i < yGrid; i++) {
    for (let j = 0; j < xGrid; j++) {
      const backgroundPosition = {
        x: (width / xGrid) * j,
        y: (height / yGrid) * i,
      };
      const currImages = [
        images[currSlideshowIdx % images.length],
        images[(currSlideshowIdx + 1) % images.length],
      ];
      // TODO: Am I recreating this component every single time?
      sliderParts.push(
        <SliderPart
          images={currImages}
          rotation={rotation}
          width={width}
          height={height}
          backgroundPosition={backgroundPosition}
          key={`part-row-${i}-col-${j}`}
        />
      );
    }
  }

  // On Mount
  useEffect(() => {
    rotationRef.current = rotation;
    currSlideshowIdxRef.current = currSlideshowIdx;

    setInterval(() => {
      // TODO: Prevents "catch up", but returns false when on second monitor
      if (document.hasFocus()) {
        setRotation(rotationRef.current - 180);
        rotationRef.current -= 180;

        setCurrSlideshowIdx(currSlideshowIdxRef.current + 1);
        currSlideshowIdxRef.current++;
      }
    }, 3000);
  }, []);

  return (
    <section
      style={{
        width,
        height,
        perspective,
        gridTemplateColumns,
        gridTemplateRows,
      }}
      className="slider-container"
    >
      {sliderParts.map((part) => part)}
    </section>
  );
};

export default Slider;
