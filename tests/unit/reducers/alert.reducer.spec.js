import alert from '../../../src/_reducers/alert.reducer';

describe('Alert Reducer', () => {
  it('Should return the same state on an inapplicable action', () => {
    const state = {};
    const newState = alert(state, { type: 'UNDEFINED_ACTION' });

    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });


  it('Should return a success alert with message', () => {
    const state = {};
    const messageState = 'A success message';
    const newState = alert(state, {
      type: 'ALERT_SUCCESS',
      message: messageState,
    });

    expect(newState.type).toBe('alert-success');
    expect(newState.message).toEqual(messageState);
  });

  it('Should return an error alert with message', () => {
    const state = {};
    const messageState = 'An error message';
    const newState = alert(state, {
      type: 'ALERT_ERROR',
      message: messageState,
    });

    expect(newState.type).toBe('alert-danger');
    expect(newState.message).toEqual(messageState);
  });

  it('Should return nothing to clear alert state', () => {
    const state = {};
    const newState = alert(state, {
      type: 'ALERT_CLEAR',
    });

    expect(newState).toEqual({});
  });
});
