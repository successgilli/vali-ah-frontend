import { runSaga } from 'redux-saga';

import API from 'modules/userSelection/requests';
import defaultReducer, {
  getSelectionRequest, getSelectionSuccess, getSelectionFailure, getSelection, fallBack
} from './index';

const initialState = {
  isLoading: false,
  userSelection: null
};

describe('Default Reducer', () => {
  it('should return default state', () => {
    const newState = defaultReducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  it('should return isLoading true on GET_SELECTION_REQUEST', () => {
    const action = getSelectionRequest({});
    const newState = defaultReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
  });

  it('should return isLoading false on GET_SELECTION_SUCCESS', () => {
    const action = getSelectionSuccess([]);
    const newState = defaultReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
  });

  it('should return isLoading false and error on GET_SELECTION_FAILURE', () => {
    const action = getSelectionFailure({ error: {} });
    const newState = defaultReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual({});
  });
});

describe('Get selection worker saga', () => {
  it('should get selection', async () => {
    sinon.stub(API, 'fetchSelection').resolves([]);
    const dispatched = [];
    const initialAction = getSelectionRequest('management');
    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, getSelection, initialAction).toPromise();

    API.fetchSelection.restore();

    expect(saga).toBeUndefined();
    expect(dispatched[0].type).toBe(getSelectionSuccess().type);
    expect(dispatched[0].articles).toBeInstanceOf(Array);
  });
});

describe('Get selection worker saga', () => {
  it('should get selection', async () => {
    sinon.stub(API, 'fetchSelection').resolves([]);
    const dispatched = [];
    const initialAction = getSelectionRequest('management');
    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, getSelection, initialAction).toPromise();

    API.fetchSelection.restore();

    expect(saga).toBeUndefined();
    expect(dispatched[0].type).toBe(getSelectionSuccess().type);
    expect(dispatched[0].articles).toBeInstanceOf(Array);
  });

  it('should catch error', async () => {
    sinon.stub(API, 'fetchSelection').rejects();

    const dispatched = [];
    const initialAction = getSelectionRequest('management');
    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, getSelection, initialAction).toPromise();

    expect(saga).toBeUndefined();
    expect(dispatched[0].type).toBe(getSelectionFailure().type);

    API.fetchSelection.restore();
  });
});

describe('Fallback tags', () => {
  it('return love for relation tags', async () => {
    const fallbackTerm = fallBack('relationship');

    expect(fallbackTerm).toBe('love');
  });

  it('return business for finance category', async () => {
    const fallbackTerm = fallBack('finance');

    expect(fallbackTerm).toBe('business');
  });

  it('return relationship for dating category', async () => {
    const fallbackTerm = fallBack('dating');

    expect(fallbackTerm).toBe('relationship');
  });

  it('return management for business category', async () => {
    const fallbackTerm = fallBack('business');

    expect(fallbackTerm).toBe('management');
  });

  it('return emotion as default category', async () => {
    const fallbackTerm = fallBack('');

    expect(fallbackTerm).toBe('emotion');
  });
});
