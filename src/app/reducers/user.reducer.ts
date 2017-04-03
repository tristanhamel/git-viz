import * as actions from '../constants/ActionTypes';

export interface IUser {
  userName: string;
  token: string;
  isLoading: boolean;
  error: false;
}

const initialState: IUser = {
  userName: 'tristanhamel',
  token: null,
  isLoading: false,
  error: false
};

export const user = (state: IUser = initialState, {type, payload}) => {
  switch (type) {
    case actions.USER_NAME_SET:
      return {
        userName: payload,
        token: null,
        isLoading: false,
        error: false
      };

    case actions.USER_TOKEN_REQUEST:
      return Object.assign({}, state, {isLoading: true, error: false});

    case actions.USER_TOKEN_RECEIVE:
      return {
        userName: state.userName,
        token: payload,
        isLoading: false,
        error: false
      };

    case actions.USER_TOKEN_ERROR:
      return Object.assign({}, state, {isLoading: false, error: true});

    case actions.USER_RESET:
      return {
        userName: 'tristanhamel',
        token: null,
        isLoading: false,
        error: false
      };

    default:
      return state;
  }
};
