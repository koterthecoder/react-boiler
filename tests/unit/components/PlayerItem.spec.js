import React from 'react';
import renderer from 'react-test-renderer';
import PlayerItem from '../../../src/_components/PlayerItem';
import mockStore from '../utilities/mockStore';


describe('Player Item Component', () => {
  it('should render player information', () => {
    const player = {
      id: 'h12jh3',
      first_name: 'Ralph',
      last_name: 'Wiggum',
      handedness: 'left',
      rating: 42,
    };

    const store = mockStore();

    const tree = renderer.create(<PlayerItem store={store} player={player} />);

    expect(tree.toJSON().children[1].children[0].children[0]).toEqual('Ralph');
    expect(tree.toJSON().children[1].children[0].children[2]).toEqual('Wiggum');
    expect(tree.toJSON().children[1].children[2]).toEqual('42');
    expect(tree.toJSON().children[1].children[4]).toEqual('Left');
  });
});
