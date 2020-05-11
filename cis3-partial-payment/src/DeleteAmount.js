import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

function DeleteAmount(props) {
  const [formData, setFormData] = useState({
    email: '',
    _id: props.match.params.id,
  });
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('/.netlify/functions/server/sendemailtodelete', formData)
      .then((res) => {
        if (res.data.status === 'success') {
          setAlert(true);
          setFormData({
            email: '',
          });
        } else {
          setFormData({
            email: '',
          });
        }
      });
  };

  return (
    <div className="container mt-3">
      {alert ? (
        <div className={`alert alert-success`}>
          <h4>
            A Confirmation email has been sent to your email address, Please
            confirm to delete
          </h4>
          <Link to="/" className="btn btn-danger">
            Go Back
          </Link>
        </div>
      ) : (
        ''
      )}
      <h3>Enter your details to delete the Amount: </h3>
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
            We will send confirmation email to this email to delete the Amount
          </small>
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

export default DeleteAmount;
