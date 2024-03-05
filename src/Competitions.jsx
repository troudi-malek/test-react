import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Competitions() {
  const [competitions, setcompetition] = useState([]);
  const navigate=useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/competitions');
        setcompetition(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      

      {/* Display existing blogs with delete buttons */}
      <div>
        <h2>Existing competion:</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>fees</th>
              <th>date</th>
              <th>particiption</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map(competition => (
              <tr key={competition.id}>
                <td>{competition.name}</td>
                <td>{competition.fees}</td>
                <td>{competition.date}</td>
                <td>{competition.particiption}</td>
                <td>{competition.description}</td>

                <td>
                  <button onClick={() => navigate("/competitionDetails")}>Delails</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Competitions;
