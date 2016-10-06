import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer'; // eslint-disable-line

it('renders things', () => {
  const component = renderer.create(
    <App things="something" />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
