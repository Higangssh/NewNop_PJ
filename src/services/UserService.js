export const fetchUsers = () => {
    return fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => {
        throw error;
      });
  };
