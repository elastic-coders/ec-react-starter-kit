import { fetchThings, fetchThingsSuccess } from '../actions';

export const testEpicOne = action$ =>
  action$.ofType(fetchThings.toString())
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo(fetchThingsSuccess('These are fetched things'));
