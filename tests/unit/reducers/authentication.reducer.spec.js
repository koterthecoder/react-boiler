import authentication from '../../../src/_reducers/authentication.reducer';

describe('Authentication Reducer', () => {
  it('Should return the same state on an inapplicable action', () => {
    const state = {};
    const newState = authentication(state, { type: 'UNDEFINED_ACTION' });

    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });


  it('Should be loggingIn on login request', () => {
    const state = {};
    const userState = { first_name: 'Ralph', last_name: 'Wiggum' };
    const newState = authentication(state, {
      type: 'USERS_LOGIN_REQUEST',
      user: userState,
    });

    expect(newState.loggingIn).toEqual(true);
    expect(newState.user).toBe(userState);
    expect(newState.user).toEqual(userState);
  });

  it('Should be loggedIn on login success', () => {
    const state = {};
    const userState = { first_name: 'Ralph', last_name: 'Wiggum' };
    const newState = authentication(state, {
      type: 'USERS_LOGIN_SUCCESS',
      user: userState,
    });

    expect(newState.loggedIn).toEqual(true);
    expect(newState.user).toBe(userState);
    expect(newState.user).toEqual(userState);
  });

  it('Should not be loggingIn on login failure', () => {
    const state = {};
    const userState = { first_name: 'Ralph', last_name: 'Wiggum' };
    const newState = authentication(state, {
      type: 'USERS_LOGIN_FAILURE',
      user: userState,
    });

    expect(newState.loggingIn).toEqual(false);
  });

  it('Should be logged out after logging out', () => {
    const state = {};
    const userState = { first_name: 'Ralph', last_name: 'Wiggum' };
    const newState = authentication(state, {
      type: 'USERS_LOGOUT',
      user: userState,
    });

    expect(newState.loggedIn).toEqual(false);
    expect(newState.user).toEqual(state);
  });
});
