import React, { useEffect, useRef } from "react";
import Slideshow from "../three/threeSlideshow";

const ThreeSlideshow = ({ images }) => {
  const slideshowContainerRef = useRef();
  const slideshowRef = useRef();

  useEffect(() => {
    slideshowRef.current = new Slideshow(
      window,
      slideshowContainerRef.current,
      images
    );
  }, []);

  return (
    <section ref={slideshowContainerRef} className="three-slideshow-container">
      <button onClick={() => slideshowRef.current.test()}>
        Something lmao
      </button>
    </section>
  );
};

export default ThreeSlideshow;
