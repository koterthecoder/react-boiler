import fetchMock from 'fetch-mock';
import playerService from '../../../src/_services/player.service';

describe('Player Service', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Get All', () => {
    it('should call appropriate endpoint', () => {
      fetchMock.get('*', {});

      playerService.getAll();

      expect(fetchMock.calls()[0][0]).toEqual('https://players-api.developer.alchemy.codes/api/players');
    });
  });

  describe('Create Player', () => {
    it('should call appropriate endpoint', () => {
      const player = {
        first_name: 'ralph',
        last_name: 'wiggum',
        handedness: 'left',
        rating: 42,
      };

      fetchMock.post('*', {});

      playerService.create(player);

      expect(fetchMock.calls()[0][0]).toEqual('https://players-api.developer.alchemy.codes/api/players');
    });

    it('should call with appropriate signature', () => {
      const player = {
        first_name: 'ralph',
        last_name: 'wiggum',
        handedness: 'left',
        rating: 42,
      };

      fetchMock.post('*', {});

      playerService.create(player);

      expect(fetchMock.calls()[0][1].body).toEqual(JSON.stringify(player));
    });
  });

  describe('Delete Player', () => {
    it('should call appropriate endpoint', () => {
      fetchMock.delete('*', {});

      playerService.delete(42);

      expect(fetchMock.calls()[0][0]).toEqual('https://players-api.developer.alchemy.codes/api/players/42');
    });
  });
});

