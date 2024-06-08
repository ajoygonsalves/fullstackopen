import React from "react";

export default function Persons({ searchFilter, handleChange }) {
  return (
    <>
      <ul>
        {searchFilter.map((person) => (
          <li key={person.id}>
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
