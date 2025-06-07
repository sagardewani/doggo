export const clearLocalStorage = () => {
  localStorage.clear();
}

export const removeAuthFromLocalStorage = () => {
  localStorage.removeItem('doggo_owner_token');
}

export const getAuthToken = () => {
  return localStorage.getItem('doggo_owner_token');
}