export async function archiveFecth(resource, id) {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`${process.env.REACT_APP_MY_CODE}/${resource}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const dataInJS = await resp.json();
      return dataInJS;
    } catch (error) {
      console.log('archiveFecth error', error);
      return false;
    }
  }