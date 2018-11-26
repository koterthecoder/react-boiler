import fetchMock from 'fetch-mock';
import getAction from '../utilities/actions';
import userActions from '../../../src/_actions/user.actions';
import userConstants from '../../../src/_constants/user.constants';
import mockStore from '../utilities/mockStore';


describe('User Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('Login', () => {
    it('should call request and success and return user', async () => {
      const payload = {
        data: {
          first_name: 'first',
          last_name: 'last',
          token: 'a token',
        },
      };

      fetchMock.post('*', { user: payload.data });

      const store = mockStore();
      store.dispatch(userActions.login('email', 'password'));

      expect(await getAction(store, userConstants.LOGIN_REQUEST)).toEqual({ type: 'USERS_LOGIN_REQUEST', user: { username: 'email' } });
      expect(await getAction(store, userConstants.LOGIN_SUCCESS)).toEqual({ type: 'USERS_LOGIN_SUCCESS', user: { user: payload.data } });
    });

    it('should call request and failure and return error', async () => {
      fetchMock.post('*', () => Promise.reject(new Error('an error')));

      const store = mockStore();
      store.dispatch(userActions.login('email', 'password'));

      expect(await getAction(store, userConstants.LOGIN_REQUEST)).toEqual({ type: 'USERS_LOGIN_REQUEST', user: { username: 'email' } });
      expect(await getAction(store, userConstants.LOGIN_FAILURE)).toEqual({ type: 'USERS_LOGIN_FAILURE', error: new Error('an error') });
    });
  });

  describe('Register', () => {
    it('should call request, success, and authorize', async () => {
      const payload = {
        data: {
          first_name: 'first',
          last_name: 'last',
          token: 'a token',
        },
      };
      const user = {
        first_name: 'first',
        last_name: 'last',
        email: 'email',
        password: 'password',
        confirm_password: 'password',
      };

      fetchMock.post('*', { user: payload.data });

      const store = mockStore();
      store.dispatch(userActions.register(user));

      expect(await getAction(store, userConstants.REGISTER_REQUEST)).toEqual({ type: 'USERS_REGISTER_REQUEST', user });
      expect(await getAction(store, userConstants.REGISTER_SUCCESS)).toEqual({ type: 'USERS_REGISTER_SUCCESS', user });
      expect(await getAction(store, userConstants.LOGIN_SUCCESS)).toEqual({ type: 'USERS_LOGIN_SUCCESS', user: { user: payload.data } });
    });


    it('should call request and failure and return error', async () => {
      const user = {
        first_name: 'first',
        last_name: 'last',
        email: 'email',
        password: 'password',
        confirm_password: 'password',
      };

      fetchMock.post('*', () => Promise.reject(new Error('an error')));

      const store = mockStore();
      store.dispatch(userActions.register(user));

      expect(await getAction(store, userConstants.REGISTER_REQUEST)).toEqual({ type: 'USERS_REGISTER_REQUEST', user });
      expect(await getAction(store, userConstants.REGISTER_FAILURE)).toEqual({ type: 'USERS_REGISTER_FAILURE', error: new Error('an error') });
    });
  });

  describe('Logout', () => {
    it('should call logout', async () => {
      const store = mockStore();
      store.dispatch(userActions.logout());

      expect(await getAction(store, userConstants.LOGOUT)).toEqual({ type: 'USERS_LOGOUT' });
    });
  });
});
