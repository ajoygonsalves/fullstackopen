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
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const textNotPresent =
      newName.length <= 0 || newNumber.length <= 0 || !newName || !newNumber;
    if (textNotPresent) return;

    const sameName = persons.some((person) => person.name === newName);

    if (sameName) {
      if (
        window.confirm(
          `${newName} is already in the phone book, replace the old number with the new one?`
        )
      ) {
        const personToEdit = persons.find((person) => person.name === newName);

        PhoneBookServer.update(personToEdit.id, {
          id: personToEdit.id,
          name: newName,
          number: newNumber,
        })
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === response.id ? response : person
            );
            setPersons(updatedPersons);

            setSuccessMessage(`Success, updated ${newName}'s contact`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information on ${newName} has already been removed from server`
            );
            console.log("Error: ", error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          });

        return; // Exit the function after handling the update
      } else {
        return; // Exit the function if the user cancels the update
      }
    }

    // Add new person if name is not found in existing persons
    PhoneBookServer.create({ name: newName, number: newNumber })
      .then((response) => {
        setPersons(persons.concat(response));
        setSuccessMessage(`Success, added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setErrorMessage(`Failed to add ${newName}`);
        console.log("Error: ", error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
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
          PhoneBookServer.toDelete(e.target.value)
            .then(() => {
              setPersons(
                persons.filter((person) => person.id !== Number(e.target.value))
              );
            })
            .catch((error) => {
              setErrorMessage(`Failed to delete ${e.target.name}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
              console.error("Error deleting contact:", error);
            });
        }
        break;
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

  useEffect(() => {
    console.log("Search Filter: ", searchFilter.at(-1));
  }, [search]);

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter search={search} handleChange={handleChange} />

      <h3>Add a new contact</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h3>Contacts</h3>
      <Persons searchFilter={searchFilter} handleChange={handleChange} />
    </div>
  );
};

export default App;
