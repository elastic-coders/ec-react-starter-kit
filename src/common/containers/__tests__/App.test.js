import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

it('renders things', () => {
  const component = renderer.create(
    <App things="something" />
  );
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
