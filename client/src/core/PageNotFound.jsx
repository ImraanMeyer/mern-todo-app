import React from 'react';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';

const pageNotFound = () => (
	<Layout>
		<div
			className="text-center d-flex"
			style={{ fontFamily: 'Poppins', height: '90vh', justifyContent: 'center', alignItems: 'center' }}
		>
			<h1>Oof! This page does not exist. 😐</h1>
		</div>
	</Layout>
);

export default withRouter(pageNotFound);
