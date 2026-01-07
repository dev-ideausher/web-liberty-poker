import cookies from 'js-cookie';

export const setToken = (token, expiry) => {
    cookies.set('token', JSON.stringify({ value: token, expiry }));
};

export const getToken = () => {
  const cookie = cookies.get('token');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const removeToken = () => cookies.remove('token');

export const setUserName = (user, expiry) => {
  cookies.set('user', JSON.stringify(user));
};

export const getUserName = () => {
  const cookie = cookies.get('user');
  if (!cookie) {
    return null;
  }
  try{
    return JSON.parse(cookie);
  }
  catch(e){
    console.log(e)
  }
};

export const removeUserName = () => cookies.remove('user');

export const setBalance = (balance) => {
    cookies.set('balance', balance);
};

export const getBalance = () => {
  const cookie = cookies.get('balance');
  if (!cookie) {
    return null;
  }
  return (cookie);
};

export const removeBalance = () => cookies.remove('balance');