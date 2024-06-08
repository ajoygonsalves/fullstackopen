import { useEffect } from "react";
import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
import PhoneBookServer from "../src/services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
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

    PhoneBookServer.create({ name: newName, number: newNumber }).then(
      (response) => {
        console.log(response);
        setPersons([...persons, { ...response }]);
      }
    );

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

  const searchFilter =
    persons.length > 0 &&
    persons.filter(
      (person) =>
        person.name?.toLowerCase().includes(search, 0) ||
        person.number?.includes(search, 0)
    );

  useEffect(() => {
    PhoneBookServer.getAll().then((response) => {
      console.log(response);
      setPersons((prevPersons) => [...prevPersons, ...response]);
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
