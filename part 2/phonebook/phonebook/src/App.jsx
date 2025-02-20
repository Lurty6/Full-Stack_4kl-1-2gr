import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [filterStr, setFilterStr] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(setAllPersons)
      .catch(() => {
        setNotification({ type: "error", text: "Failed to fetch data from server" });
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const existingPerson = allPersons.find(person => person.name.trim() === newPerson.name.trim());

    try {
      if (!existingPerson) {
        const addedPerson = await personService.create(newPerson);
        setAllPersons(prev => [...prev, addedPerson]);
        setNewPerson({ name: "", number: "" });
        setNotification({ type: "success", text: `${addedPerson.name} was successfully added` });
      } else if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number?`)) {
        const updatedPerson = await personService.update(existingPerson.id, newPerson);
        setAllPersons(prev =>
          prev.map(person => (person.id !== updatedPerson.id ? person : updatedPerson))
        );
        setNewPerson({ name: "", number: "" });
        setNotification({ type: "success", text: `${newPerson.name} was successfully updated` });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An unknown error occurred";
      setNotification({ type: "error", text: errorMsg });

      if (error.response?.status === 404) {
        setAllPersons(prev => prev.filter(person => person.id !== existingPerson?.id));
      }
    }
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setNewPerson(prev => ({ ...prev, [name]: value.trim() }));
  };

  const handleChangeFilter = (event) => {
    setFilterStr(event.target.value);
  };

  const handleRemove = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await personService.remove(id);
        setAllPersons(prev => prev.filter(person => person.id !== id));
        setNotification({ type: "success", text: `${name} was successfully deleted` });
      } catch {
        setNotification({ type: "error", text: `Failed to delete ${name}` });
      }
    }
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterStr={filterStr} handleChangeFilter={handleChangeFilter} />
      <h3>add a new</h3>
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
      />
      <h3>Numbers</h3>
      <Persons
        filterStr={filterStr}
        allPersons={allPersons}
        handleRemove={handleRemove}
      />
    </>
  );
};

export default App;
