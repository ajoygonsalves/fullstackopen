import React from "react";

export default function Filter({ search, handleChange }) {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        type="search"
        id="search"
        name="search"
        value={search}
        onChange={handleChange}
      />
    </>
  );
}
