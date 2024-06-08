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

    const sameName = persons.some((person) => person.name === newName);

    if (
      sameName &&
      window.confirm(
        `${newName} is already in the phone book, replace the old number with the new one?`
      )
    ) {
      const personToEdit = persons.find((person) => person.name === newName);

      return PhoneBookServer.update(personToEdit.id, {
        id: personToEdit.id,
        name: newName,
        number: newNumber,
      }).then((response) => {
        const updatedPersons = persons.map((person) =>
          person.id === response.id ? response : person
        );
        setPersons(updatedPersons);
      });
    }

    PhoneBookServer.create({ name: newName, number: newNumber }).then(
      (response) => {
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
      case "delete":
        if (
          window.confirm(`Do you really want to delete ${e.target.name}? :(`)
        ) {
          PhoneBookServer.toDelete(e.target.value);
          setPersons(persons.filter((person) => person.id !== e.target.value));
        }
    }
  };

  const searchFilter =
    search.length > 0
      ? persons.filter(
          (person) =>
            person.name?.toLowerCase().includes(search.toLowerCase(), 0) ||
            person.number?.includes(search, 0)
        )
      : persons;

  useEffect(() => {
    PhoneBookServer.getAll().then((response) => {
      setPersons(response);
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
      <Persons
        searchFilter={searchFilter}
        handleChange={handleChange}
        persons={persons}
      />
    </div>
  );
};

export default App;
