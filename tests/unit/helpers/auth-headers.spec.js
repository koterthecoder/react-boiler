import authHeaders from '../../../src/_helpers/auth-header';
import mockLocalStorage from '../utilities/mockLocalStorage';


describe('Auth Header Helper', () => {
  beforeEach(() => {
    global.localStorage = mockLocalStorage;
    global.localStorage.clear();
  });


  it('should return correct header if user has token stored', () => {
    const user = {
      token: 'a fake token',
    };

    global.localStorage.setItem('user', JSON.stringify(user));

    const headers = authHeaders();
    expect(headers).toEqual({ Authorization: 'Bearer a fake token' });
  });

  it('should return nothing if no user token is stored', () => {
    const headers = authHeaders();
    expect(headers).toEqual({});
  });
});
