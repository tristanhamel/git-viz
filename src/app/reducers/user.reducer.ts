import * as actions from '../constants/ActionTypes';

export interface IUser {
  userName: string;
}

const initialState = {
  userName: 'tristanhamel'
};

export const user = (state: IUser = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_USER:
      return payload;

    default:
      return state;
  }
};
