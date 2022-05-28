export async function postFecth(resource, dataToPost) {
  try {
    const token = localStorage.getItem("token");
    const resp = await fetch(`${process.env.REACT_APP_MY_CODE}/${resource}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToPost),
    });
    const usersFromApi = await resp.json();
    if (resource === "auth/login") {
      if (usersFromApi) {
        localStorage.setItem("token", usersFromApi.data);
      }
    }
    return usersFromApi;
  } catch (error) {
    return false;
  }
}
