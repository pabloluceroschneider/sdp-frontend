import endpoint from '../helpers/scope';
import catchResponse from '../helpers/catchResponse';
import productService from './productService';
const is500 = code => code === 500;
let basePlanService = {};

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
basePlanService.create = async (body) => {
	const uri = `${endpoint}/baseplans`;
	const response = await fetch(uri, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			name: body.name,
			productId: body.product._id,
			tasks: body.tasks?.map( ({name, observation}) => ({name, observation}))
		})
	}).then(catchResponse);

	return response;
};

/**
 * UPDATE baseplan
 */
 basePlanService.update = async (body) => {
	const uri = `${endpoint}/baseplans/${body._id}`;
	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			name: body.name,
			productId: body.product._id,
			tasks: body.tasks?.map( ({name, observation, estimate}) => ({name, observation, estimate}))
		})
	}).then(catchResponse);
	return response;
};


// Private Method
const mapResponseToTable = async (res) => {

	const appData = JSON.parse(localStorage.getItem("persist:sdp")).appData;
	const companies = JSON.parse(appData).companies;
	const mappedCompanies = companies?.reduce( (acc, current) => ({
		[current._id]: current,	
		...acc,
	}),{}) || {};
	
	const { response: products} = await productService.allProducts();
	const mappedProducts = products?.reduce( (acc, current) => ({
		[current._id]: current,	
		...acc,
	}),{}) || {};

	return res.map( (bp) => ({
		...bp,
		product: mappedProducts[bp.productId] || { name: 'El producto ya no existe'},
		company: mappedCompanies[mappedProducts[bp.productId]?.companyId] || { name: 'La empresa ya no existe'}
	}))
}

basePlanService.getAll = async () => {
	const uri = `${endpoint}/baseplans`;

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
	const res = await mapResponseToTable(response.response);
	return { response: res, error: response.error };
};

basePlanService.getByProductId = async ({ productId }) => {
	const uri = `${endpoint}/basePlans/productId/${productId}`;

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


/**
 * DELETE baseplan
 */
basePlanService.delete = async (basePlanId) => {
	const uri = `${endpoint}/baseplans/${basePlanId}`;

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

export default basePlanService;
