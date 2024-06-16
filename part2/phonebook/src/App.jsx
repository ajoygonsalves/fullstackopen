import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import PhoneBookServer from "../src/services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newLastName, setNewLastName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textNotPresent =
      newFirstName.length <= 0 ||
      newLastName.length <= 0 ||
      newNumber.length <= 0;

    if (textNotPresent) return;

    const sameName = persons.some(
      (person) =>
        person.firstName === newFirstName && person.lastName === newLastName
    );

    if (sameName) {
      if (
        window.confirm(
          `${newFirstName} ${newLastName} is already in the phone book, replace the old number with the new one?`
        )
      ) {
        const personToEdit = persons.find(
          (person) =>
            person.firstName === newFirstName && person.lastName === newLastName
        );

        try {
          const response = await PhoneBookServer.update(personToEdit.id, {
            firstName: newFirstName,
            lastName: newLastName,
            phoneNumber: newNumber,
          });

          const updatedPersons = persons.map((person) =>
            person.id === response.person.id ? response.person : person
          );
          setPersons(updatedPersons);

          setSuccessMessage(
            `Success, updated ${newFirstName} ${newLastName}'s contact`
          );
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        } catch (error) {
          setErrorMessage(
            `Information on ${newFirstName} ${newLastName} has already been removed from server`
          );
          console.log("Error: ", error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }

        return; // Exit the function after handling the update
      } else {
        return; // Exit the function if the user cancels the update
      }
    }

    // Add new person if name is not found in existing persons
    try {
      const response = await PhoneBookServer.create({
        firstName: newFirstName,
        lastName: newLastName,
        phoneNumber: newNumber,
      });

      setPersons(persons.concat(response.person));
      setSuccessMessage(`Success, added ${newFirstName} ${newLastName}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      setNewFirstName("");
      setNewLastName("");
      setNewNumber("");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      console.log("Error: ", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleChange = async (e) => {
    switch (e.target.id) {
      case "firstName":
        setNewFirstName(e.target.value);
        break;
      case "lastName":
        setNewLastName(e.target.value);
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
          try {
            await PhoneBookServer.toDelete(e.target.value);
            setPersons(
              persons.filter((person) => person.id !== e.target.value)
            );
          } catch (error) {
            setErrorMessage(`Failed to delete ${e.target.name}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
            console.error("Error deleting contact:", error);
          }
        }
        break;
    }
  };

  const searchFilter =
    search.length > 0
      ? persons.filter(
          (person) =>
            person.firstName?.toLowerCase().includes(search.toLowerCase(), 0) ||
            person.lastName?.toLowerCase().includes(search.toLowerCase(), 0) ||
            person.phoneNumber?.includes(search, 0)
        )
      : persons;

  useEffect(() => {
    const fetchData = async () => {
      const response = await PhoneBookServer.getAll();
      setPersons(response);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <Filter search={search} handleChange={handleChange} />

      <h3>Add a new contact</h3>
      <PersonForm
        newNumber={newNumber}
        newFirstName={newFirstName} // Corrected typo here
        newLastName={newLastName}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h3>Contacts</h3>
      <Persons searchFilter={searchFilter} handleChange={handleChange} />
    </div>
  );
};

export default App;
