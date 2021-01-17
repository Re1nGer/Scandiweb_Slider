import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import SearchBar from "./SearchBar";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [content, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Replace this key by your own
  const key = "18692613-961490bbfdf1b33b886f2171b";
  const api = `https://pixabay.com/api/?key=${key}&q=${query}`;

  const fetchPic = async () => {
    setIsLoading(true);
    const get = await fetch(api);
    const response = await get.json();
    const { hits } = response;
    setData(hits);
    setIsLoading(false);
  };

  const onClick = () => {
    setUrl(api);
  };

  useEffect(() => {
    fetchPic();
  }, [url]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      setUrl(api);
    }
  };
  return (
    // Here, I pass in data as was shown in one of your emails
    <>
      {isLoading ? <LoadingComponent /> : <Slider data={content} />}

      <SearchBar
        handleChange={handleChange}
        handleClick={onClick}
        handleKeyPressed={handleKeyPressed}
      />
    </>
  );
};

export default App;
