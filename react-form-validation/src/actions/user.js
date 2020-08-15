import validator from 'validator';

import {
  SET_BTN_LARGE,
  ADD_A_OUTPUT,
  ADD_OUTPUT_NAME,
  SET_FORM_DATA,
  SET_OUTPUT_FORM_DATA,
  SET_VALIDATION_ERROR,
  SET_FROM_SUBMIT_SUCCESS,
  CLOSE_POPUP,
} from './types';
import store from '../store';

export const setBtnLarge = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_BTN_LARGE,
    });
  } catch (err) {
    console.log('Something went very wrong!');
  }
};

export const addAOutput = (outputname, name) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_A_OUTPUT,
      payload: outputname,
    });

    dispatch({
      type: ADD_OUTPUT_NAME,
      payload: name,
    });
  } catch (err) {
    console.log('Something went very wrong!');
  }
};

export const handleForm = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_FORM_DATA,
      payload: { ...data },
    });
  } catch (err) {
    console.log('Something went very wrong!');
  }
};

export const handleOutputForm = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_OUTPUT_FORM_DATA,
      payload: { ...data },
    });
  } catch (err) {
    console.log('Something went very wrong!');
  }
};

export const submitForm = () => async (dispatch) => {
  for (const property in store.getState().user.formData) {
    dispatch({
      type: SET_VALIDATION_ERROR,
      payload: {
        [property]: !validator.isURL(store.getState().user.formData[property], {
          require_protocol: true,
        }),
      },
    });

    // Removing validation from CDN settings <select>
    if (
      property == 'provider' &&
      store.getState().user.formData[property] !== ' '
    ) {
      dispatch({
        type: SET_VALIDATION_ERROR,
        payload: {
          provider: false,
        },
      });
    }
  }
  // Storing error status
  let errors = [];
  // console.log(Object.keys(store.getState().user.formErrors).length);

  for (const property in store.getState().user.formErrors) {
    errors.push(store.getState().user.formErrors[property]);
  }

  if (errors.indexOf(true) === -1) {
    console.log('Ready to submit');
    dispatch({
      type: SET_FROM_SUBMIT_SUCCESS,
    });
  }
};

export const closePopup = () => async (dispatch) => {
  dispatch({
    type: CLOSE_POPUP,
  });
};
