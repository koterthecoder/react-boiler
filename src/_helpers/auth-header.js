function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.Token) {
    return { Authorization: `Bearer ${user.Token}` };
  }
  return {};
}

export default authHeader;
