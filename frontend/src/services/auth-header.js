export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('token'));
    if (user && user.token.access) {
      const token = user.token.access
      const config = {
          headers: { Authorization: `Bearer ${token}` }
      };     
      return config;
    } else {
      return {};
    }
  }
