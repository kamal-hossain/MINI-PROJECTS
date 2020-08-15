import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../css/AddButton.css';
import { setBtnLarge, addAOutput } from '../../actions/user';
import VideoEncoding from './VideoEncoding';
import Gif from './Gif';
import Thumnails from './Thumnails';
import Storyboard from './Storyboard';

function AddButton({ user, setBtnLarge, addAOutput }) {
  const [error, setErrors] = useState('');
  if (!user.btnLarge) {
    return (
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setBtnLarge();
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  } else {
    return (
      <div
        style={{ height: '100%', display: 'flex', border: '1px solid #ced4da' }}
      >
        <div>
          <button
            type="button"
            className="btn btn-success"
            style={{ height: '100%' }}
            disabled
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="btnGroups">
          <button
            className="btn btn-lg btn-block"
            onClick={() => {
              if (user.outputNames.includes('VideoEncoding')) {
                setErrors('Video Encoding Already added!');
                setTimeout(() => setErrors(false), 1500);
              } else {
                addAOutput(<VideoEncoding />, 'VideoEncoding');
              }
            }}
          >
            <i className="fas fa-film"></i> Video Encoding
          </button>

          <button
            className="btn btn-lg btn-block"
            onClick={() => {
              if (user.outputNames.includes('Thumnails')) {
                setErrors('Video Encoding Already added!');
                setTimeout(() => setErrors(false), 1500);
              } else {
                addAOutput(<Thumnails />, 'Thumnails');
              }
            }}
          >
            <i className="fas fa-image"></i> Thumbnails
          </button>
          <button
            className="btn btn-lg btn-block"
            onClick={() => {
              if (user.outputNames.includes('Gif')) {
                setErrors('Video Encoding Already added!');
                setTimeout(() => setErrors(false), 1500);
              } else {
                addAOutput(<Gif />, 'Gif');
              }
            }}
          >
            {' '}
            <i className="far fa-image"></i> GIF
          </button>
          <button
            className="btn btn-lg btn-block"
            onClick={() => {
              if (user.outputNames.includes('Storyboard')) {
                setErrors('Video Encoding Already added!');
                setTimeout(() => setErrors(false), 1500);
              } else {
                addAOutput(<Storyboard />, 'Storyboard');
              }
            }}
          >
            {' '}
            <i className="far fa-image"></i> Storyboard
          </button>
          {error ? <div className={`alert alert-danger`}>{error}</div> : ''}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setBtnLarge, addAOutput })(AddButton);
