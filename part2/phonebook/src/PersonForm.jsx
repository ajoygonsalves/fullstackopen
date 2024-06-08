import React from "react";

export default function PersonForm({
  handleSubmit,
  handleChange,
  newName,
  newNumber,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          full name:{" "}
          <input
            type="text"
            id="name"
            name="name"
            value={newName}
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
