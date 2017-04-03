import * as actions from '../constants/ActionTypes';

export interface IEventObject {
  id: string;
}

export interface IWatchEvents {
  data: Array<IEventObject>;
  currentIds: Array<string>;
  isLoading: boolean;
  error: Object;
}


const initialState = {
  data: [],
  currentIds: [],
  isLoading: false,
  error: null
};

export const watchEvents = (state: IWatchEvents = initialState, {type, payload}) => {
  switch (type) {
    case actions.WATCH_EVENTS_GET:
      return Object.assign({}, state, {isLoading: true, error: null});

    case actions.WATCH_EVENTS_GET_SUCCESS:
      console.log(payload);
      const ids = payload.map(item => item.id);
      const filtered = state.data.filter(item => ids.indexOf(item.id) === -1 );

      return {
        data: [...filtered, ...payload],
        currentIds: ids,
        isLoading: false,
        error: null
      };

    case actions.WATCH_EVENTS_GET_ERROR:
      return Object.assign({}, state, {isLoading: false, error: payload});

    case actions.WATCH_EVENTS_RESET:
      return Object.assign({}, state, {currentIds: []});

    default:
      return state;
  }
};
