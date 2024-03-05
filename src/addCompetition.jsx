import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Add() {
  const [newCompetition, setNewCompetition] = useState({
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetition((prevCompetition) => ({
      ...prevCompetition,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/competitions', newCompetition);
      console.log(response.data);
      setNewCompetition({
        name: '',
        fees: '',
        date: '',
        participants:'',
        description:''
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
        name:
          <input
            type="text"

            value={newCompetition.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
        fees:
          <textarea
            name="body"
            value={newCompetition.fees}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
        date:
          <input
            type="text"
            name="author"
            value={newCompetition.date}
            onChange={handleInputChange}
          />
        </label>
        <br/>
        <label>
        participants:
          <input
            type="text"
            name="author"
            value={newCompetition.participants}
            onChange={handleInputChange}
          />
          <br/>
            <label>
            description:
          <input
            type="text"
            name="author"
            value={newCompetition.description}
            onChange={handleInputChange}
          />
        </label>
        </label>
        <br />
        <button type="submit">Add competition</button>
      </form>
    </>
  );
}

export default Add;
