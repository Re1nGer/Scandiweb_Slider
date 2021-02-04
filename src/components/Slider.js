import React, { useRef, useEffect } from "react";
import "../styles/style.css";

const Slider = ({ children, data }) => {
  const numberOfImages = data.length + children.length;
  const sliderNode = useRef();

  let xDifference;
  let locked = false;
  let xPoint = null;
  let slideCurrent = 0;

  useEffect(() => {
    sliderNode.current.style.setProperty("--amountOfSlides", numberOfImages);

    sliderNode.current.addEventListener("mousedown", handleMouseDown);
    sliderNode.current.addEventListener("mousemove", handleMove);
    sliderNode.current.addEventListener("mouseup", handleMouseUp);

    sliderNode.current.addEventListener("touchstart", handleMouseDown);
    sliderNode.current.addEventListener("touchmove", handleMove);
    sliderNode.current.addEventListener("touchend", handleMouseUp);

    return () => {
      sliderNode.current.removeEventListener("mouseup", handleMouseUp);
      sliderNode.current.removeEventListener("mousemove", handleMove);
      sliderNode.current.removeEventListener("mousedown", handleMouseDown);

      sliderNode.current.removeEventListener("touchstart", handleMouseDown);
      sliderNode.current.removeEventListener("touchmove", handleMove);
      sliderNode.current.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const unify = (event) => {
    return event.changedTouches ? event.changedTouches[0] : event;
  };

  const handleMouseDown = (event) => {
    xPoint = unify(event).clientX;
    locked = true;
    sliderNode.current.classList.remove("smooth");
  };

  const handleMove = (event) => {
    if (locked) {
      sliderNode.current.style.setProperty(
        "--pixelsDragged",
        `${Math.round(unify(event).clientX - xPoint)}px`
      );
    }
  };

  const handleMouseUp = (event) => {
    if (locked) {
      xDifference = unify(event).clientX - xPoint;
      let sign = Math.sign(xDifference);
      let windowInnerWidth = window.innerWidth;
      let dragThreshold = +((sign * xDifference) / windowInnerWidth).toFixed(2);
      if (
        (slideCurrent > 0 || sign < 0) &&
        (slideCurrent < numberOfImages - 1 || sign > 0) &&
        dragThreshold > 0.1
      ) {
        slideCurrent -= sign;
        sliderNode.current.style.setProperty("--slideCurrent", slideCurrent);
      }
      sliderNode.current.style.setProperty("--pixelsDragged", "0px");
      sliderNode.current.classList.add("smooth");
      xPoint = null;
      locked = false;
    }
  };

  const childData = children.map((child, index) => {
    return (
      <div className="slide" key={index}>
        {child}
      </div>
    );
  });

  const fetchedPictures = data.map((object) => {
    return (
      <div key={object.id} className="slide">
        <img draggable="false" src={object.largeImageURL} />
      </div>
    );
  });

  return (
    <>
      <div ref={sliderNode} className="slider smooth">
        {fetchedPictures}
        {childData}
      </div>
      <div className="horizontal-line" />
    </>
  );
};

export default Slider;
