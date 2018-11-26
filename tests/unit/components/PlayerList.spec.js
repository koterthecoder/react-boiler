import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import PlayerList from '../../../src/_components/PlayerList';
import mockStore from '../utilities/mockStore';

describe('Player List Component', () => {
  it('should render players when items is greater than 0', () => {
    const players = {
      items: [
        {
          id: 'h12jh3',
          first_name: 'Ralph',
          last_name: 'Wiggum',
          handedness: 'left',
          rating: 42,
        },
        {
          id: '65yrr6',
          first_name: 'Lisa',
          last_name: 'Simpson',
          handedness: 'right',
          rating: 54,
        },
      ],
      loading: false,
    };

    const store = mockStore();

    const tree = renderer
      .create(<Provider store={store}><PlayerList players={players} /></Provider>);

    expect(tree.root.findAllByType('li').length).toEqual(2);
  });
});
