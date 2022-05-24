
export async function getFetch(resource) {
  if (localStorage.getItem("token") !== null) {
    try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${process.env.REACT_APP_MY_CODE}/${resource}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const usersFromApi = await resp.json();
    return usersFromApi;
  } catch (error) {
    return false;
  } 
}
}

