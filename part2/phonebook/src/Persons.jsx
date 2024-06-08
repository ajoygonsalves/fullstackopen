import React from "react";

export default function Persons({ searchFilter }) {
  return (
    searchFilter.length > 0 && (
      <ul>
        {searchFilter.map((person, index) => (
          <li key={person.name + index}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    )
  );
}
