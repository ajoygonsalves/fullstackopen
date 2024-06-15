import React from "react";

export default function PersonForm({
  handleSubmit,
  handleChange,
  newFirstName,
  newLastName,
  newNumber,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          First name:{" "}
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newFirstName}
            onChange={handleChange}
          />
          Last name:{" "}
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={newLastName}
            onChange={handleChange}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            id="number"
            name="number"
            value={newNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add contact</button>
        </div>
      </form>
    </>
  );
}
