import fetchMock from 'fetch-mock';
import getAction from '../utilities/actions';
import playerActions from '../../../src/_actions/player.actions';
import playerConstants from '../../../src/_constants/player.constants';
import mockStore from '../utilities/mockStore';


describe('User Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('Get Players', () => {
    it('should call request and success and return players', async () => {
      const payload = {
        data: {
          players: [
            {
              first_name: 'ralph',
              last_name: 'wiggum',
            },
            {
              first_name: 'lisa',
              last_name: 'simpson',
            },
          ],
        },
      };

      fetchMock.get('*', payload.data);

      const store = mockStore();
      store.dispatch(playerActions.getAll());

      expect(await getAction(store, playerConstants.GETALL_REQUEST)).toEqual({ type: 'PLAYERS_GETALL_REQUEST' });
      expect(await getAction(store, playerConstants.GETALL_SUCCESS)).toEqual({ type: 'PLAYERS_GETALL_SUCCESS', players: payload.data.players });
    });

    it('should call failure on error', async () => {
      fetchMock.get('*', () => Promise.reject(new Error('an error')));

      const store = mockStore();
      store.dispatch(playerActions.getAll());

      expect(await getAction(store, playerConstants.GETALL_REQUEST)).toEqual({ type: 'PLAYERS_GETALL_REQUEST' });
      expect(await getAction(store, playerConstants.GETALL_FAILURE)).toEqual({ type: 'PLAYERS_GETALL_FAILURE', error: new Error('an error') });
    });
  });


  describe('Create Player', () => {
    it('should call request and success and return players', async () => {
      const newPlayer = {
        first_name: 'bart',
        last_name: 'simpson',
      };

      fetchMock.post('*', newPlayer);

      const store = mockStore();
      store.dispatch(playerActions.create(newPlayer));

      expect(await getAction(store, playerConstants.CREATE_REQUEST)).toEqual({ type: 'PLAYERS_CREATE_REQUEST', playerToCreate: newPlayer });
      expect(await getAction(store, playerConstants.CREATE_SUCCESS)).toEqual({ type: 'PLAYERS_CREATE_SUCCESS', createdPlayer: newPlayer });
    });

    it('should call failure on error', async () => {
      const newPlayer = {
        first_name: 'bart',
        last_name: 'simpson',
        id: 'a1',
      };

      fetchMock.post('*', () => Promise.reject(new Error('an error')));

      const store = mockStore();
      store.dispatch(playerActions.create(newPlayer));

      expect(await getAction(store, playerConstants.CREATE_REQUEST)).toEqual({ type: 'PLAYERS_CREATE_REQUEST', playerToCreate: newPlayer });
      expect(await getAction(store, playerConstants.CREATE_FAILURE)).toEqual({ type: 'PLAYERS_CREATE_FAILURE', error: new Error('an error') });
    });
  });


  describe('Delete Players', () => {
    it('should call request and success and return players', async () => {
      const newPlayer = {
        first_name: 'bart',
        last_name: 'simpson',
        id: 'a1',
      };

      fetchMock.delete('*', {});

      const store = mockStore();
      store.dispatch(playerActions.delete(newPlayer.id));

      expect(await getAction(store, playerConstants.DELETE_REQUEST)).toEqual({ type: 'PLAYER_DELETE_REQUEST', id: newPlayer.id });
      expect(await getAction(store, playerConstants.DELETE_SUCCESS)).toEqual({ type: 'PLAYER_DELETE_SUCCESS', id: newPlayer.id });
    });

    it('should call failure on error', async () => {
      const newPlayer = {
        first_name: 'bart',
        last_name: 'simpson',
        id: 'a1',
      };

      fetchMock.delete('*', () => Promise.reject(new Error('an error')));

      const store = mockStore();
      store.dispatch(playerActions.delete(newPlayer.id));

      expect(await getAction(store, playerConstants.DELETE_REQUEST)).toEqual({ type: 'PLAYER_DELETE_REQUEST', id: newPlayer.id });
      expect(await getAction(store, playerConstants.DELETE_FAILURE)).toEqual({ type: 'PLAYER_DELETE_FAILURE', id: newPlayer.id, error: new Error('an error') });
    });
  });
});
