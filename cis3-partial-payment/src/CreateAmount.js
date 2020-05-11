import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

function CreateAmount() {
  const [formData, setFormData] = useState({
    email: '',
    amount: '',
    name: '',
    ID: '',
  });
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validating input

    await axios
      .post('/.netlify/functions/server/submitform', formData)
      .then((res) => {
       
        setAlert(true);
        setFormData({
          email: '',
          amount: '',
          name: '',
          ID: '',
        });
      });
  };

  return (
    <div className="container mt-3">
      {alert ? (
        <div className={`alert alert-success`}>
          <h3>A Confirmation email has been sent to your email address</h3>
          <Link to="/" className="btn btn-info">
            Go Back
          </Link>
        </div>
      ) : (
        ''
      )}
      <h3>Enter your details: </h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            placeholder="Email Address"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={formData.email}
            onChange={(e) => onChange(e)}
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            We will send confirmation email to this email to create the POST
          </small>
        </div>
        <div class="form-group">
          <input
            placeholder="Amount You Can Pay"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name="amount"
            value={formData.amount}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            placeholder="Your name"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name="name"
            value={formData.name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            placeholder="Your ID"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name="ID"
            value={formData.ID}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <Link to="/" className="btn btn-danger mr-2">
          Go Back
        </Link>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateAmount;
