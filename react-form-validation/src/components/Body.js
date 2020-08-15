import React from 'react';
import { connect } from 'react-redux';
import './css/Body.css';
import AddButton from './outputBoxes/AddButton';
import { handleForm, submitForm, closePopup } from '../actions/user';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Body({ user, handleForm, submitForm, closePopup }) {
  const onChange = (e) => {
    handleForm({ [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <h1 className="display-4">Create a Job</h1>
          <h4 className="inputHeading">Input</h4>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Enter the media URL to convert
            </label>
            {user.formErrors ? (
              <div
                className={`alert alert-danger small  ${
                  user.formErrors.sourceURL
                    ? ' liveValidateMessage liveValidateMessage--visible'
                    : 'hide'
                }
            `}
              >
                <h6>Please enter a valid URL</h6>
              </div>
            ) : (
              ''
            )}

            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Source URL"
                aria-label="Source URL"
                aria-describedby="button-addon2"
                value={user.formData.sourceURL}
                name="sourceURL"
                onChange={(e) => onChange(e)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="URL of the video/ audio file. We can tranfer media file from HTTP,FTP and STP server. 
                  We suppor the most popular formats such as MP4, MOV, OGV, WebM, AVI, MPEG, FLV, MKV, MP3,ACC and more"
                  disabled
                >
                  <i className="fas fa-question-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 d-none d-lg-block">
          <div className="card w-70 mt-4">
            <div className="card-body">
              <h5 className="card-title">Account limitation</h5>
              <p className="card-text">
                With the Free plan, you can only encode up to 5 min long videos.
                and process one output at a time. Upgrading to the pay as go
                plan will remove these limits and speed up the whole process.
              </p>
              <a href="!#" className="btn btn-success">
                Upgrade Plan
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7">
          <h4>CDN settings</h4>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              All the media files will be uploaded to the CDN of your choice
            </label>
            {user.formErrors ? (
              <div
                className={`alert alert-danger small  ${
                  user.formErrors.provider
                    ? ' liveValidateMessage liveValidateMessage--visible'
                    : 'hide'
                }
            `}
              >
                <h6>Please select a provider</h6>
              </div>
            ) : (
              ''
            )}

            <div className="select">
              <select
                name="slct"
                id="slct"
                name="provider"
                onChange={(e) => onChange(e)}
              >
                <option selected disabled>
                  Choose your provider
                </option>
                <option value="GP">GP</option>
                <option value="Robi">Robi</option>
                <option value="Airtel">Airtel</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* outputs */}
      <div className="row mt-3">
        <div className="col-lg-12">
          <h4>Outputs</h4>
          <div className="row">
            {user.outputs.map((el, idx) => (
              <div className="col-lg-4 mt-4">{el}</div>
            ))}
            {user.outputs.length >= 4 ? (
              ''
            ) : (
              <div className="col-lg-4 mt-4">
                <AddButton />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-10">
          <h4>WebHook</h4>
          <p>
            When the job is finished, you will recieve a POST HTTP request to
            the given address
          </p>
          {user.formErrors ? (
            <div
              className={`alert alert-danger small  ${
                user.formErrors.webHook
                  ? ' liveValidateMessage liveValidateMessage--visible'
                  : 'hide'
              }
            `}
            >
              <h6>Please enter a valid URL</h6>
            </div>
          ) : (
            ''
          )}

          <div className="input-group mb-3 ">
            <input
              required
              type="text"
              className="form-control"
              placeholder="https://app.onto.co/tools/webhooks/e152b577/rj_solutions"
              aria-label="https://app.onto.co/tools/webhooks/e152b577/rj_solutions"
              aria-describedby="button-addon2"
              value={user.formData.webHook}
              name="webHook"
              onChange={(e) => onChange(e)}
            />

            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                data-toggle="tooltip"
                data-placement="top"
                title="You will receive every media URLs and error codes to the given address. You can read our tutorial on how to handle notifications in your application."
                disabled
              >
                <i className="fas fa-question-circle"></i>
              </button>
            </div>
          </div>
          <small id="emailHelp" className="form-text text-muted">
            Leave blank to debug the request with out{' '}
            <span>Webhook Inspector</span>
          </small>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col">
          <button className="btn btn-success" onClick={() => submitForm()}>
            Create
          </button>
          <button className="btn ">See the code </button>
        </div>
      </div>

      <Modal show={user.submitForm} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Woohoo, Your form has been submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="success" onClick={closePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { handleForm, submitForm, closePopup })(Body);
