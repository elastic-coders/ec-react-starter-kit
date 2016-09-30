import 'rxjs';
import { combineEpics } from 'redux-observable';
import { testEpicOne } from './testEpics';

export default combineEpics (
  testEpicOne,
);
