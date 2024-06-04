import React from "react";
import Part from "./Part";

export default function Content({
  part1,
  part2,
  part3,
  exercises1,
  exercises2,
  exercises3,
}) {
  return (
    <>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </>
  );
}
