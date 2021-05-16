import React from "react";
const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = async (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      type="search"
      placeholder="Filter here"
      value={keyword}
      onChange={handleSearchChange}
      className="form-control mb-4"
    />
  );
};
export default LocalSearch;
