import React from 'react';
import { connect } from 'react-redux';
import { handleOutputForm } from '../../actions/user';

function Gif({ user, handleOutputForm }) {
  const onChange = (e) => { 
    handleOutputForm({ [e.target.name]: e.target.value });
  };
  return (
    <div class="card w-100" style={{ height: '265px' }}>
      <div class="card-body">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <button type="button" class="btn" style={{ padding: '0px' }}>
            <i class="fas fa-times"></i>
          </button>
        </div>
        <p class="card-title">
          <i class="far fa-image"></i> Gif
        </p>
        <div class="input-group mb-3 mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="Width"
            aria-label="Width"
            aria-describedby="button-addon2"
            name="gifWidth"
            onChange={(e) => onChange(e)}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              data-toggle="tooltip"
              data-placement="top"
              title="Please enter a valid URL"
              disabled
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </div>
        </div>
        <div class="input-group mb-3 mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="Offset in second"
            aria-label="Offset in second"
            aria-describedby="button-addon2"
            name="offsetInSecond"
            onChange={(e) => onChange(e)}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              data-toggle="tooltip"
              data-placement="top"
              title="Please enter a valid URL"
              disabled
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </div>
        </div>
        <div class="input-group mb-3 mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="/path/animation.gif"
            aria-label="/path/animation.gif"
            aria-describedby="button-addon2"
            name="gifPath"
            onChange={(e) => onChange(e)}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              data-toggle="tooltip"
              data-placement="top"
              title="Please enter a valid URL"
              disabled
            >
              <i class="fas fa-question-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { handleOutputForm })(Gif);