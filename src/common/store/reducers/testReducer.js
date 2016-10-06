import { handleActions } from 'redux-actions';
import { fetchThings, fetchThingsSuccess } from '../actions';

const initialState = { thingsFetched: 'none', loading: false };

export default handleActions({
  [fetchThings]: state => ({
    ...state,
    loading: true,
  }),
  [fetchThingsSuccess]: (state, action) => ({
    ...state,
    loading: false,
    thingsFetched: action.payload,
  }),
}, initialState);
