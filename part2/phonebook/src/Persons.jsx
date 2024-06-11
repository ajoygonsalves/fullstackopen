import React, { useEffect } from "react";

export default function Persons({ searchFilter, handleChange }) {
  return (
    <>
      <ul>
        {searchFilter.map((person, index) => (
          <li key={`${person.id}-${index}`}>
            <div className="person-item">
              <p>
                {person.name} - {person.number} - id: {person.id}
              </p>
              <button
                type="button"
                id="delete"
                value={person.id}
                name={person.name}
                onClick={handleChange}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}
