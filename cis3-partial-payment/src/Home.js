import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      
      await axios
        .get('/.netlify/functions/server/getallamounts')
        .then((res) => {
         
          setData(res.data.data);
        });
    }
  
    fetchData();
  }, []);

  const tr = data.map((el, idx) => (
    <tr>
      <th scope="row">{idx + 1}</th>
      <td>{el.ID} </td>
      <td>{el.name}</td>
      <td>
        {el.amount} ৳&nbsp;{' '}
        <Link to={`/deleteamount/${el._id}`} className="btn btn-danger btn-sm">
          X
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-3">
      <h4>After disscussing with family maximum amount Students can pay: </h4>
      <Link to="/createamount" className="btn btn-info m-2">
        Add amount
      </Link>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>{tr}</tbody>
      </table>
    </div>
  );
}

export default Home;
