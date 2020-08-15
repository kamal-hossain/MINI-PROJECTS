import React from 'react';
import './css/Navbar.css';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg ml-auto sticky-top shadow-sm">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link icon" href="#">
                  <i className="fab fa-pied-piper-square fa-lg"></i>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Jobs <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tools
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  API
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Support
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-success" href="#">
                  Create Job
                </a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group mb-3">
                <div className="input-group-prepend mt-2">
                  <label className="input-group-text">
                    <i className="far fa-user"></i>{' '}
                    <span className="ml-3">
                      rj_solutions{' '}
                      <span className="badge badge-secondary">Free</span>
                    </span>
                    <i className="fas fa-chevron-down ml-3"></i>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
