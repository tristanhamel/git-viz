import * as actions from '../constants/ActionTypes';

export interface IRepository {
  id: string;
}

export interface IRepositories {
  lastUpdated: number;
  data: Array<IRepository>;
}

const initialState: IRepositories = {
  lastUpdated: null,
  data: []
};

export const repositories = (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.REPOSITORIES_SUCCESS:
      return {
        lastUpdated: Date.now(),
        data: [...state.data, ...payload]
      };

    default:
      return state;
  }
};
