import players from '../../../src/_reducers/players.reducer';


describe('Players Reducer', () => {
  it('Should return the same state on an inapplicable action', () => {
    const state = {};
    const newState = players(state, { type: 'UNDEFINED_ACTION' });

    expect(newState).toBe(state);
    expect(newState).toEqual(state);
  });


  it('Should return loading on get request', () => {
    const state = {};
    const newState = players(state, {
      type: 'PLAYERS_GETALL_REQUEST',
    });

    expect(newState.loading).toEqual(true);
    expect(newState.loading).toBe(true);
  });

  it('Should return players on get success', () => {
    const state = {};
    const playerList = [{ first_name: 'Ralph', last_name: 'Wiggum' }, { first_name: 'Lisa', last_name: 'Simpson' }];
    const newState = players(state, {
      type: 'PLAYERS_GETALL_SUCCESS',
      players: playerList,
    });

    expect(newState.items).toEqual(playerList);
    expect(newState.items).toBe(playerList);
  });

  it('Should return error on get failure', () => {
    const state = {};
    const errorMessage = 'An error message';
    const newState = players(state, {
      type: 'PLAYERS_GETALL_FAILURE',
      error: errorMessage,
    });

    expect(newState.error).toEqual(errorMessage);
    expect(newState.error).toBe(errorMessage);
  });


  it('Should return creating as true on create request', () => {
    const state = {};
    const newState = players(state, {
      type: 'PLAYERS_CREATE_REQUEST',
    });

    expect(newState.creating).toEqual(true);
    expect(newState.creating).toBe(true);
  });

  it('Should return nothing on create success', () => {
    const state = {};
    const newState = players(state, {
      type: 'PLAYERS_CREATE_SUCCESS',
    });

    expect(newState).toEqual({});
  });


  it('Should return error on create failure', () => {
    const state = {};
    const errorMessage = 'An error message';
    const newState = players(state, {
      type: 'PLAYERS_CREATE_FAILURE',
      error: errorMessage,
    });

    expect(newState.error).toEqual(errorMessage);
    expect(newState.error).toBe(errorMessage);
  });


  it('Should return player to delete and deleting as true on delete request', () => {
    const playerList = [{ first_name: 'Ralph', last_name: 'Wiggum', id: 'a1' }, { first_name: 'Lisa', last_name: 'Simpson', id: 'b2' }];
    const state = { items: playerList };

    const playerToDelete = { first_name: 'Ralph', last_name: 'Wiggum', id: 'a1' };
    const deletingPlayer = {
      first_name: 'Ralph', last_name: 'Wiggum', id: 'a1', deleting: true,
    };

    const newState = players(state, {
      type: 'PLAYER_DELETE_REQUEST',
      id: playerToDelete.id,
    });


    expect(newState.items.filter(item => item.id === deletingPlayer.id)[0].deleting).toEqual(true);
    expect(newState.items.filter(item => item.id === deletingPlayer.id)[0].deleting).toBe(true);
    expect(newState.items.filter(item => item.deleting === true)[0]).toEqual(deletingPlayer);
  });


  it('Should return player list without deleted player on delete success', () => {
    const playerList = [{ first_name: 'Ralph', last_name: 'Wiggum', id: 'a1' }, { first_name: 'Lisa', last_name: 'Simpson', id: 'b2' }];
    const state = { items: playerList };

    const playerToDelete = { first_name: 'Ralph', last_name: 'Wiggum', id: 'a1' };
    const playerListWithoutDeletedPlayer = [{ first_name: 'Lisa', last_name: 'Simpson', id: 'b2' }];

    const newState = players(state, {
      type: 'PLAYER_DELETE_SUCCESS',
      id: playerToDelete.id,
    });

    expect(newState.items).toEqual(playerListWithoutDeletedPlayer);
  });


  it('Should return original player list delete failure', () => {
    const playerList = [{
      first_name: 'Ralph', last_name: 'Wiggum', id: 'a1', deleting: true,
    }, { first_name: 'Lisa', last_name: 'Simpson', id: 'b2' }];
    const state = { items: playerList };

    const playerToDelete = { first_name: 'Ralph', last_name: 'Wiggum', id: 'a1' };
    const errorMessage = 'An error message';

    const newState = players(state, {
      type: 'PLAYER_DELETE_FAILURE',
      id: playerToDelete.id,
      error: errorMessage,
    });

    expect(newState.items.filter(item => item.id === playerToDelete.id)[0].deleteError)
      .toEqual(errorMessage);
    expect(newState.items.filter(item => item.id === playerToDelete.id)[0].deleteError)
      .toBe(errorMessage);
  });
});
