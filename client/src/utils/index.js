const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  return localStorage.removeItem('token');
};

export { getToken, removeToken };
