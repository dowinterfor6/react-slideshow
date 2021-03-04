import React, { useEffect, useRef } from "react";
import Slideshow from "../three/threeSlideshow";

const ThreeSlideshow = ({ images, fullResImages }) => {
  const slideshowContainerRef = useRef();
  const slideshowRef = useRef();

  useEffect(() => {
    slideshowRef.current = new Slideshow(
      window,
      slideshowContainerRef.current,
      // images
      fullResImages
    );
  }, []);

  return (
    <section ref={slideshowContainerRef} className="three-slideshow-container">
      <button onClick={() => slideshowRef.current.test()}>
        Something lmao
      </button>
      <img src={images[1].url} style={{ height: 650, width: 940 }} />
    </section>
  );
};

export default ThreeSlideshow;
