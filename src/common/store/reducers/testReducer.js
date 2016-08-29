import { handleActions } from 'redux-actions';
import { fetchThings } from '../actions';

const initialState = { thingsFetched: 'none' };

export default handleActions({
  [fetchThings]: (state, action) => ({
    ...state,
    thingsFetched: action.payload,
  }),
}, initialState);
