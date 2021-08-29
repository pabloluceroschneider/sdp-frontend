import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let syncService = {};

/**
 * syncService
 */
syncService.update = async ({ method, endpoint, body}) => {
	const uri = `${url}/${endpoint}`;
	const response = await fetch(uri, {
		method: method,
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
