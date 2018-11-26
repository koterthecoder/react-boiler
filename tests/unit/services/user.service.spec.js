import fetchMock from 'fetch-mock';
import userService from '../../../src/_services/user.service';


describe('User Service', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Login', () => {
    it('should call appropriate endpoint', () => {
      fetchMock.post('*', {});

      userService.login('aUser@email.com', 'Passw0rd');

      expect(fetchMock.calls()[0][0]).toEqual('https://players-api.developer.alchemy.codes/api/login');
    });

    it('should call with appropriate signature', () => {
      fetchMock.post('*', {});

      userService.login('aUser@email.com', 'Passw0rd');

      expect(fetchMock.calls()[0][1].body).toEqual('{"email":"aUser@email.com","password":"Passw0rd"}');
    });
  });

  describe('Register', () => {
    it('should call appropriate endpoint', () => {
      const data = {
        first_name: 'homer',
        last_name: 'simpson',
        email: 'aUser@email.com',
        password: 'Passw0rd',
        confirm_password: 'Passw0rd',
      };

      fetchMock.post('*', {});

      userService.register(data);

      expect(fetchMock.calls()[0][0]).toEqual('https://players-api.developer.alchemy.codes/api/user');
    });

    it('should call with the appropriate signature', () => {
      const data = {
        first_name: 'homer',
        last_name: 'simpson',
        email: 'aUser@email.com',
        password: 'Passw0rd',
        confirm_password: 'Passw0rd',
      };

      fetchMock.post('*', {});

      userService.register(data);

      expect(fetchMock.calls()[0][1].body).toEqual(JSON.stringify(data));
    });
  });
});
