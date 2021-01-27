import React from "react";

const SearchBar = ({ handleClick, handleKeyPressed }) => {
  const click = () => {
    handleClick();
  };

  const keyPressed = (event) => {
    handleKeyPressed(event);
  };
  return (
    <>
      <div className="searchWrapper">
        <input type="text" placeholder="Search" onKeyPress={keyPressed} />
        <button onClick={click} />
      </div>
    </>
  );
};

export default SearchBar;
