import endpoint from '../helpers/scope';
import catchResponse from '../helpers/catchResponse';
let usersService = {};

/**
 * Permissions Service
 * @param {Object} body { username, password } 
 * @param {string} url optional - default const const endpoint = 'http://localhost:8080';
 * @returns token auth
 */
usersService.allPermissions = async () => {
	const uri = `${endpoint}/permissions`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(res => res.json())


	return response;
};

usersService.allUsers = async () => {
	const uri = `${endpoint}/users`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(res => res.json())

	return response;
};

usersService.create = async (body) => {
	const uri = `${endpoint}/users`;

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

	}).then(res => res.json())

	return response;
};

usersService.setPermissions = async ({ id, permissions }) => {
	const uri = `${endpoint}/permissions/setPermissions`;

	const body = { id, permissions }

	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body)
	}).then(res => res.json())

	return response;

}

usersService.delete = async ({ id }) => {
	const uri = `${endpoint}/users/${id}`;
	const response = await fetch(uri, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse)

	return response;

}

usersService.update = async ({id, ...body}) => {
	const uri = `${endpoint}/users/${id}`;
	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body)
	}).then(catchResponse)

	return response;

}


export default usersService;
