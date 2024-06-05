import React from "react";

export default function Total({ parts }) {
  let exerciseArray = parts.map((part) => part.exercises);

  return (
    <>
      <p>
        Number of exercises {exerciseArray.reduce((acc, curr) => acc + curr, 0)}
      </p>
    </>
  );
}
