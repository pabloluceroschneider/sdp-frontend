import endpoint from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let authService = {};

/**
 * Auth Login
 * @param {Object} body { username, password } 
 * @param {string} url optional - default const const endpoint = 'http://localhost:8080';
 * @returns token auth
 */
authService.login = async ({ body, url = endpoint }) => {
	const uri = `${url}/auth/login`;

	const response = await fetch(uri, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body)
	}).then(catchResponse);

	return response;
};

export default authService;
