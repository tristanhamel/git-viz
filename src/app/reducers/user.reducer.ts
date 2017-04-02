import * as actions from '../constants/ActionTypes';

export interface IUser {
  userName: string;
}

const initialState = {
  userName: 'tristanhamel',
  token: null
};

export const user = (state: IUser = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_USER_NAME:
      return {
        userName: payload,
        token: null
      };

    case actions.SET_USER_TOKEN:
      return {
        userName: state.userName,
        token: payload
      };

    default:
      return state;
  }
};
