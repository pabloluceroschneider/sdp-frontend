import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let processService = {};

/**
 * 
 * getTasks
 *  
 */
processService.getTasks = async ({username}) => {
	const uri = `${url}/users/tasks/${username}`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
	.then(catchResponse)
	.catch(err => console.warn(err))

	return response;
};

/**
 * 
 * start Task
 *  
 */
 processService.updateTask = async ({ id, body }) => {
	const uri = `${url}/tasks/${id}`;
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
	}).then(catchResponse);

	return response;
};


export default processService;
