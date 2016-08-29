import { createAction } from 'redux-actions';

export const fetchThings = createAction('FETCH_THING', async id => {
  return `fetched ${id}`;
});
