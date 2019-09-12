// actions
import mainReducer, {
  getProfileRequest,
  getProfileRequestSuccess,
  profileFailure,
  getProfileRequestUpdate,
  getProfileRequestUpdateSuccess,
  updateProfileFailure,
} from './index';

describe('Reducers', () => {
  it('should check if reducer is loading while getting profile', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const newState = mainReducer(initialState, getProfileRequest());
    expect(newState.data).toEqual([]);
    expect(newState.loading).toEqual(true);
  });
  it('should check if reducer is getting user profile', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const payload = {
      userName: 'chuckss',
      status: 200,
    };
    const newState = mainReducer(
      initialState,
      getProfileRequestSuccess(payload),
    );
    expect(newState.data.userName).toEqual('chuckss');
    expect(newState.data.status).toEqual(200);
    expect(newState.loading).toEqual(false);
  });

  it('should check if reducer is getting an error while receiving profile detail', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const errorPayload = {
      userDetail: [],
      error: 'wrong id',
      status: 400,
    };
    const newState = mainReducer(initialState, profileFailure(errorPayload));
    expect(newState.errors.error).toEqual('wrong id');
    expect(newState.errors.status).toEqual(400);
    expect(newState.loading).toEqual(false);
  });
});

describe('Update user profile', () => {
  it('should check if reducer is loading while updating user profile', async () => {
    const initialState = {
      data: [],
      loading: false,
    };
    const newState = mainReducer(
      initialState,
      getProfileRequestUpdate(),
    );

    expect(newState.data).toEqual([]);
    expect(newState.loading).toEqual(true);
  });

  it('should check if reducer is updating profile', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const payload = {
      userName: 'chuckss',
      status: 200,
    };
    const newState = mainReducer(
      initialState,
      getProfileRequestUpdateSuccess(payload),
    );

    expect(newState.data.userName).toEqual('chuckss');
    expect(newState.data.status).toEqual(200);
    expect(newState.loading).toEqual(false);
  });

  it('should check if reducer is getting an error while updating profile detail', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const errorPayload = {
      userDetail: [],
      error: 'wrong id',
      status: 400,
    };
    const newState = mainReducer(
      initialState,
      updateProfileFailure(errorPayload),
    );
    expect(newState.errors.userDetail).toEqual([]);
    expect(newState.errors.error).toEqual('wrong id');
    expect(newState.errors.status).toEqual(400);
    expect(newState.loading).toEqual(false);
  });

  it('should test reducer default state', async () => {
    const initialState = {
      data: [],
      loading: false,
      errors: null,
    };
    const newState = mainReducer(initialState, {});
    expect(newState.data).toEqual([]);
    expect(newState.loading).toEqual(false);
    expect(newState.errors).toEqual(null);
  });
});
