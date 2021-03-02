import React, { useEffect, useRef, useState } from "react";
import SliderPart from "./SliderPart";

const Slider = ({ images, options }) => {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef();
  const {
    width,
    height,
    rows,
    cols,
    perspective,
    rowDelay,
    colDelay,
  } = options;
  const [currSlideshowIdx, setCurrSlideshowIdx] = useState(0);
  const currSlideshowIdxRef = useRef();

  const gridTemplateColumns = `repeat(${cols}, 1fr)`;
  const gridTemplateRows = `repeat(${rows}, 1fr)`;

  // TODO: This should be an option
  const transitionDuration = 1000;
  // Delay = relative to transitionDuration?

  const sliderParts = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const backgroundPosition = {
        x: (width / cols) * j,
        y: (height / rows) * i,
      };
      const currImages = [
        images[currSlideshowIdx % images.length],
        images[(currSlideshowIdx + 1) % images.length],
      ];

      const transitionDelay =
        (rows - 1 - j) * rowDelay + (cols - 1 - i) * colDelay;
      // TODO: Am I recreating this component every single time?
      sliderParts.push(
        <SliderPart
          images={currImages}
          rotation={rotation}
          width={width}
          height={height}
          backgroundPosition={backgroundPosition}
          transitionDelay={transitionDelay}
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
