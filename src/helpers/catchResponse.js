
const is200 = ({status}) => status === 200;

const catchResponse = async (response) => {
  const success = is200(response);
  if (success) {
    return {
      response: await response.json(),
      error: false,
    }
  }
	return {
		response: await response.text(),
		error: response.status > 300,
	};
};

export default catchResponse;