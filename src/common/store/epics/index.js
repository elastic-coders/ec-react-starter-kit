// Needed because redux-observable does not add any of the RxJS operators to the
// Observable.prototype. In production it's better to import only the ones you
// use in every epic module.
import 'rxjs';
import { combineEpics } from 'redux-observable';
import testEpicOne from './testEpics';

export default combineEpics(
  testEpicOne,
);
