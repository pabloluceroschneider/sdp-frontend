const prod = 'https://api-sdp.herokuapp.com/api/v1'
const localhost = 'http://localhost:5000/api/v1'
const ip_localhost = 'http://192.168.0.165:5000/api/v1'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const scopeParam = urlParams.get('scope')

const hostname = window.location.hostname

const param = {
  prod,
  localhost,
}

const domain = {
  localhost,
  "192.168.0.165": ip_localhost,
}

const scope = param[scopeParam] || domain[hostname] || prod

export default scope