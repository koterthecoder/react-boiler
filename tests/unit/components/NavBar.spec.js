import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import NavBar from '../../../src/_components/NavBar';
import mockStore from '../utilities/mockStore';


describe('NavBar Component', () => {
  it('should show logout button when user is logged in', () => {
    const initialState = {
      authentication: {
        loggedIn: true,
      },
    };

    const store = mockStore(initialState);

    const tree = renderer.create(<Provider store={store}><NavBar /></Provider>);

    expect(tree.toJSON().children[2].children[0].type).toBe('a');
  });

  it('should NOT show logout button when user is not logged in', () => {
    const initialState = {
      authentication: {
        loggedIn: false,
      },
    };

    const store = mockStore(initialState);

    const tree = renderer.create(<Provider store={store}><NavBar /></Provider>);

    expect(tree.toJSON().children[2].children).toBeNull();
  });
});
