import React from 'react';
import Routes from './Routes';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
	const tree = renderer.create(<Routes />).toJSON();
	expect(tree).toMatchSnapshot();
});
