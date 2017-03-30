import * as actions from '../constants/ActionTypes';

const initialState = {
  userName: 'tristanhamel'
};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_USER:
      return payload;

    default:
      return state;
  }
};
