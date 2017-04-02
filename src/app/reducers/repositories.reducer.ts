import * as actions from '../constants/ActionTypes';

export interface IRepositories {
  initialState: Array<{}>
};

const initialState = [];

export const repositories = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.REPOSITORIES_SUCCESS:
      return payload;

    default:
      return state;
  }
};
