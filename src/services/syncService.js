import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let syncService = {};

/**
 * syncService
 */
syncService.update = async ({ id, body }) => {
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
	})
	.then(catchResponse)
	.catch(err => { throw Error(err) })
	return response;
};


export default syncService;
