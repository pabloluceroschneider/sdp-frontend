import endpoint from '../helpers/scope';
import catchResponse from '../helpers/catchResponse';
let productService = {};

/**
 * Create Company
 * @param {Object} body { company } 
 * @returns {Promise}
 */
productService.createProduct = async (body) => {
	const uri = `${endpoint}/products`;

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


productService.allProducts = async () => {
	const uri = `${endpoint}/products`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse);

	return response;
};

productService.productByCompanyId = ({ companyId }) => {
	const uri = `${endpoint}/products/companyId/${companyId}`;
	return new Promise( async (res, rej) => {
		try {
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
			res(response)
		} catch (error) {
			res([])
		}
	})
};

productService.update = async ({_id, ...body}) => {
	const uri = `${endpoint}/products/${_id}`;

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

productService.delete = async ({ id }) => {
	const uri = `${endpoint}/products/${id}`;

	const response = await fetch(uri, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse);

	return response;
};

export default productService;
