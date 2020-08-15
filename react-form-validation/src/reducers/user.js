import {
  SET_BTN_LARGE,
  ADD_A_OUTPUT,
  ADD_OUTPUT_NAME,
  SET_FORM_DATA,
  SET_OUTPUT_FORM_DATA,
  SET_VALIDATION_ERROR,
  SET_FROM_SUBMIT_SUCCESS,
  CLOSE_POPUP,
} from '../actions/types';

const initialState = {
  btnLarge: false,
  outputs: [],
  outputNames: [],
  formData: { sourceURL: '', webHook: '', provider: ' ' },
  outputFormData: {},
  formErrors: undefined,
  submitForm: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_BTN_LARGE:
      return {
        ...state,
        btnLarge: true,
      };

    case ADD_OUTPUT_NAME:
      return {
        ...state,
        outputNames: [...state.outputNames, payload],
      };
    case ADD_A_OUTPUT:
      return {
        ...state,
        outputs: [...state.outputs, payload],
      };
    case SET_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...payload },
      };
    case SET_OUTPUT_FORM_DATA:
      return {
        ...state,
        outputFormData: { ...state.outputFormData, ...payload },
      };
    case SET_VALIDATION_ERROR:
      return {
        ...state,
        formErrors: { ...state.formErrors, ...payload },
      };
    case SET_FROM_SUBMIT_SUCCESS:
      return {
        ...state,
        submitForm: true,
      };
    case CLOSE_POPUP: {
      return {
        ...state,
        btnLarge: false,
        outputs: [],
        outputNames: [],
        formData: { sourceURL: '', webHook: '', provider: ' ' },
        formErrors: undefined,
        outputFormData: {},
        submitForm: false,
      };
    }
    default:
      return state;
  }
}
