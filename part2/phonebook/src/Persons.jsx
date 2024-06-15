import React, { useEffect } from "react";

export default function Persons({ searchFilter, handleChange }) {
  return (
    <>
      <ul>
        {searchFilter &&
          searchFilter.map((person) => (
            <li key={`${person.id}`}>
              <div className="person-item">
                <p>
                  {person.firstName} {person.lastName} - {person.phoneNumber}
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
