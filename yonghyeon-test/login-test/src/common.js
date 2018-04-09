export const VALIDATE_RESULT = {
  'INVALIDATION_EMAIL': 'INVALIDATION_EMAIL',
  'EMPTY_NAME': 'EMPTY_NAME',
  'EMPTY_PASSWORD': 'EMPTY_PASSWORD',
  'DIFFERENT_PASSWORD': 'DIFFERENT_PASSWORD',
  'SUCCESS': 'SUCCESS'
};

export const errorHandler = function (error) {
  if (error) {
    console.log(`
      Status Code 
      ${error.response.status} 
      ${error.response.statusText}
      ${error.response.data}
    `);
  }

  // 단순 로그 처리 말고도 다양한 기능을 할 수 있다는 점 새겨넣도록 하자.
}

export const requestWithToken = function (url, options, method= 'GET', data= {}) {
  const ACCESS_TOKEN = getToken();
  method = method.toUpperCase();
  options.headers = Object.assign(options.headers, {'Authorization': ACCESS_TOKEN});
  // 수정 필요할 수도..

  switch (method) {
    case 'GET':
      return axios.get(url, options);
    case 'POST':
      return axios.post(url, data, options);
    case 'PUT':
      return axios.put(url, data, options);
    case 'PATCH':
      return axios.patch(url, data, options);
    case 'DELETE':
      return axios.delete(url, options);
  }
};

export const getToken = function () {
  return localStorage.getItem('access_token');
}

export const setToken = function (token) {
  localStorage.setItem('access_token', token);
};