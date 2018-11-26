import registration from '../../../src/_reducers/registration.reducer';


describe('Registration Reducer', () => {
  it('Should return the same state on an inapplicable action', () => {
    const state = {};
    const newState = registration(state, { type: 'UNDEFINED_ACTION' });

    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });


  it('Should be registering on registration request', () => {
    const state = {};
    const newState = registration(state, {
      type: 'USERS_REGISTER_REQUEST',
    });

    expect(newState.registering).toEqual(true);
  });

  it('Should be empty on registration success', () => {
    const state = {};
    const newState = registration(state, {
      type: 'USERS_REGISTER_SUCCESS',
    });

    expect(newState).toEqual({});
  });

  it('Should return registering as false on registration failure', () => {
    const state = {};
    const newState = registration(state, {
      type: 'USERS_REGISTER_FAILURE',
    });

    expect(newState.registering).toEqual(false);
  });
});
