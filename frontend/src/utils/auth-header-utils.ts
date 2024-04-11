import Cookies from 'js-cookie';

const registerCookie = Cookies.get('RegisterCookie');
const loginCookie = Cookies.get('LoginCookie');
export const headers = {
   'Content-Type': 'application/json',
   Authorization: `Bearer ${loginCookie || registerCookie}`,
};
