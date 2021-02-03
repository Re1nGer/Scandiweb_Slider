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

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      setQuery(event.target.value);
      setUrl(api);
    }
  };
  return (
    // Here, I pass in data as was shown in one of your emails
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Slider data={content}>
          <div>
            <p>Any Html content being passed</p>
          </div>
          <div>
            <h1>Content</h1>
          </div>
          <div>
            <h1>Some Content</h1>
          </div>
          <div>
            <h1>Random Content</h1>
          </div>
        </Slider>
      )}

      <SearchBar handleClick={onClick} handleKeyPressed={handleKeyPressed} />
    </>
  );
};

export default App;
