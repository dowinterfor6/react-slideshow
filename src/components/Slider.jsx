// import React, { useEffect, useRef, useState } from "react";
// import SliderPart from "./SliderPart";

// const Slider = ({ images, options }) => {
//   const [rotation, setRotation] = useState(0);
//   const rotationRef = useRef();
//   const {
//     width,
//     height,
//     rows,
//     cols,
//     perspective,
//     rowConfig,
//     colConfig,
//     pauseOnBlur = true,
//   } = options;
//   const [currSlideshowIdx, setCurrSlideshowIdx] = useState(0);
//   const currSlideshowIdxRef = useRef();

//   const gridTemplateColumns = `repeat(${cols}, 1fr)`;
//   const gridTemplateRows = `repeat(${rows}, 1fr)`;

//   const sliderParts = [];
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       const backgroundPosition = {
//         x: (width / cols) * j,
//         y: (height / rows) * i,
//       };
//       const currImages = [
//         images[currSlideshowIdx % images.length],
//         images[(currSlideshowIdx + 1) % images.length],
//       ];

//       const totalColDelay =
//         (colConfig.fromLeft ? j : cols - 1 - j) * colConfig.delay;
//       const totalRowDelay =
//         (rowConfig.fromTop ? i : rows - 1 - i) * rowConfig.delay;

//       const transitionDelay = totalColDelay + totalRowDelay;
//       // TODO: Am I recreating this component every single time?
//       sliderParts.push(
//         <SliderPart
//           images={currImages}
//           rotation={rotation}
//           width={width}
//           height={height}
//           backgroundPosition={backgroundPosition}
//           transitionDelay={transitionDelay}
//           key={`part-row-${i}-col-${j}`}
//         />
//       );
//     }
//   }

//   // On Mount
//   useEffect(() => {
//     rotationRef.current = rotation;
//     currSlideshowIdxRef.current = currSlideshowIdx;

//     const slideInterval = setInterval(() => {
//       // TODO: Prevents "catch up", but returns false when on second monitor
//       if (document.hasFocus() || !pauseOnBlur) {
//         const nextRotation = colConfig.fromLeft
//           ? rotationRef.current + 180
//           : rotationRef.current - 180;

//         setRotation(nextRotation);
//         rotationRef.current = nextRotation;

//         setCurrSlideshowIdx(currSlideshowIdxRef.current + 1);
//         currSlideshowIdxRef.current++;
//       }
//     }, 3000);

//     return () => {
//       clearInterval(slideInterval);
//     };
//   }, []);

//   return (
//     <section
//       style={{
//         width,
//         height,
//         perspective,
//         gridTemplateColumns,
//         gridTemplateRows,
//       }}
//       className="slider-container"
//     >
//       {sliderParts.map((part) => part)}
//     </section>
//   );
// };

// export default Slider;
