const {
  REACT_APP_GOOGLE_BOOKS_API_KEY,
  REACT_APP_GOOGLE_BOOKS_API_URL
} = process.env;

class GoogleSearch {
  static search = term => {
    return fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}/?q=${term}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}
        `)
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  static searchById = id => {
    return fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}/${id}
    `)
      .then(res => res.json())
      .catch(err => console.log(err));
  };
}

export default GoogleSearch;
