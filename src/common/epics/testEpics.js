export const testEpicOne = action$ =>
  action$.filter(action => action.type === 'FETCH_THINGS')
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'FETCH_THINGS_SUCCESS', payload: 'These are fetched things' });
