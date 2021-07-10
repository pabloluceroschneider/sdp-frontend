
const prod = 'prod-enviroment'
const localhost = 'localhost'

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const scopeParam = urlParams.get('scope')

const hostname = window.location.hostname

const param = {
  prod,
  localhost,
}

const domain = {
  localhost
}

const scope = param[scopeParam] || domain[hostname] || prod

export default scope