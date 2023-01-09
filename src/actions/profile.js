import axios from 'axios';

import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_PROFILES,
  NO_REPOS,
  GET_REPOS,
} from './types';
//get current users profiles.

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};

//create or update a profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    // const body = JSON.stringify({
    //   formData
    // });

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await axios.post('/api/profile', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));

    navigate('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? this can not be undone.')) {
    try {
      await axios.delete('/api/profile');

      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(setAlert('Your account has been permanatly deleted'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// const initialState = {
//   profile: null,
//   profiles: [],
//   repos: [],
//   loading: true,
//   error: {}
// };
