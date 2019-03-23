import React from 'react';

const Home = () => {
	return (
		<div>
			<div className="header">
				<h1>Welcome to "Home"!!</h1>
				<p>To go to another page, select your destination in the breadcrumb.</p>
				<p>To logon an user just save the first information in the form (in "Registration"), after this you can add more users to the list of the first logged user.</p>
				<p>After the login of an user, its name will apear on the head and the dropdown menu will be available. In the dropdown menu your can logout and log in another user in registration form again.</p>
				<h3>Enjoy!</h3>
			</div>
			<div className="content" id="content">
			</div>
		</div>
	);
}

export default Home;
