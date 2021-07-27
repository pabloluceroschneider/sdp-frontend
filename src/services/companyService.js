import endpoint from '../helpers/scope';

const is500 = code => code === 500;
let companyService = {};

const getResponse = async response => {
  return {
    responseText: await response.text(),
    error: is500(response.status)
  }
}

/**
 * Create Company
 * @param {Object} body { company } 
 * @returns {Promise}
 */
companyService.createCompany = async ({ company }) => {
	const uri = `${endpoint}/companies`;

	const response = await fetch(uri, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({name: company})
	}).then(getResponse);

	return response;
};


companyService.allCompanies = async () => {
	const uri = `${endpoint}/companies`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(res => res.json());

	return response;
};

companyService.update = async ({_id, name}) => {
	const uri = `${endpoint}/companies/${_id}`;

	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({name})
	}).then(getResponse);

	return response;
};

companyService.delete = async (companyId) => {
	const uri = `${endpoint}/companies/${companyId}`;

	const response = await fetch(uri, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(getResponse);

	return response;
};

export default companyService;
