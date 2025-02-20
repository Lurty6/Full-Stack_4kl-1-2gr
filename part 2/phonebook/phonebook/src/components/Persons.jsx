const Persons = ({ filterStr, allPersons, handleRemove }) => {
  const persons = allPersons.filter(person =>
    person.name.toLowerCase().includes(filterStr.toLowerCase().trim())
  );

  return (
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleRemove(person.id, person.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
