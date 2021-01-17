import React, { useState, useRef, useEffect } from "react";
import "../styles/style.css";

const Slider = ({ data }) => {
  const [numberOfImages, setNumberOfImages] = useState(data.length);

  const sliderNode = useRef();

  const xDifference = useRef();
  const locked = useRef(false);
  const xPoint = useRef();
  const currentImage = useRef(0);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleMouseUp);

    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);

      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const unify = (event) => {
    return event.changedTouches ? event.changedTouches[0] : event;
  };

  const handleMove = (event) => {
    if (locked.current) {
      sliderNode.current.style.setProperty(
        "--tx",
        `${Math.round(unify(event).clientX - xPoint.current)}px`
      );
    }
  };

  const handleMouseUp = (event) => {
    if (locked.current) {
      xDifference.current = unify(event).clientX - xPoint.current;
      let sign = Math.sign(xDifference.current);
      if (
        (currentImage.current > 0 || sign < 0) &&
        (currentImage.current < numberOfImages - 1 || sign > 0)
      ) {
        currentImage.current -= sign;
        sliderNode.current.style.setProperty("--i", currentImage.current);
      }
      sliderNode.current.style.setProperty("--tx", "0px");
      sliderNode.current.classList.add("smooth");
      xPoint.current = null;
      locked.current = false;
    }
  };

  const handleMouseDown = (event) => {
    xPoint.current = unify(event).clientX;
    locked.current = true;
    sliderNode.current.classList.remove("smooth");
  };

  if (numberOfImages !== 0) {
    return (
      <>
        <div ref={sliderNode} className="slider smooth">
          {data.map((url, idx) => (
            <div key={idx} className="slide">
              <img draggable="false" src={url.largeImageURL} />
            </div>
          ))}
        </div>

        <hr />
      </>
    );
  } else {
    return <h1>Looks like keyword is wrong</h1>;
  }
};

export default Slider;
