import React from 'react';
import { connect } from 'react-redux';
import { handleOutputForm } from '../../actions/user';

function Thumnails({ user, handleOutputForm }) {
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
          <i class="fas fa-film"></i> Thumbnails
        </p>
        <div class="select" style={{ width: 'auto' }}>
          <select
            name="slct"
            id="slct"
            name="numberOfThumbnail"
            onChange={(e) => onChange(e)}
          >
            <option selected disabled>
              Number of thumbnails
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {/* Width and height */}
        <div class="input-group mb-3 mt-2">
          <input
            type="text"
            class="form-control"
            placeholder="Width"
            aria-label="Width"
            aria-describedby="button-addon2"
            style={{ borderRight: '1px solid #ced4da' }}
            name="thumbnailWidth"
            onChange={(e) => onChange(e)}
          />
          <span style={{ padding: '5px' }}> x </span>
          <input
            type="text"
            class="form-control"
            placeholder="Height"
            aria-label="Height"
            aria-describedby="button-addon2"
            style={{ borderRight: '1px solid #ced4da' }}
            name="thumbnailHeight"
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
            placeholder="/path/tumbnail-#num#.jpg"
            aria-label="/path/tumbnail-#num#.jpg"
            aria-describedby="button-addon2"
            name="thumbailPath"
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

export default connect(mapStateToProps, { handleOutputForm })(Thumnails);
