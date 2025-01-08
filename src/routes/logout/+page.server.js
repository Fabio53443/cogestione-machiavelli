import Cookies from 'js-cookie';
export function load() {
  console.log('Logout');
  
  Cookies.remove("token");
  return {
    status: 302,
    headers: {
      location: "/login"
    }
  }}