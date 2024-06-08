import { useEffect } from "react";
import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Melvin Hellas", number: "038277384923" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const textNotPresent =
      newName.length <= 0 || newNumber.length <= 0 || !newName || !newNumber;
    if (textNotPresent) return;
    if (persons.some((person) => person.name === newName))
      return alert(`${newName} already exists in the phonebook`);

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "name":
        setNewName(e.target.value);
        break;
      case "number":
        setNewNumber(e.target.value);
        break;
      case "search":
        setSearch(e.target.value);
        break;
    }
  };

  const searchFilter = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(search, 0) ||
      person.number.includes(search, 0)
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((promise) => {
      const items = promise.data.map((item) => item);
      setPersons((prevPersons) => [...prevPersons, ...items]);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleChange={handleChange} />

      <h3>Add a new contact</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h3>Contacts</h3>
      <Persons searchFilter={searchFilter} />
    </div>
  );
};

export default App;
