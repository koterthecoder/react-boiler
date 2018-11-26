import apiUrls from '../../../src/_helpers/api-urls';


describe('Api URL Helper', () => {
  it('should return the Login URL', () => {
    const loginUrl = apiUrls.Login;
    expect(loginUrl).toEqual('https://players-api.developer.alchemy.codes/api/login');
  });

  it('should return the user URL', () => {
    const userUrl = apiUrls.User;
    expect(userUrl).toEqual('https://players-api.developer.alchemy.codes/api/user');
  });

  it('should return the players URL', () => {
    const playersUrl = apiUrls.Players;
    expect(playersUrl).toEqual('https://players-api.developer.alchemy.codes/api/players');
  });

  it('should return the delete players URL', () => {
    const deletePlayerUrl = apiUrls.DeletePlayer('a1');
    expect(deletePlayerUrl).toEqual('https://players-api.developer.alchemy.codes/api/players/a1');
  });
});
