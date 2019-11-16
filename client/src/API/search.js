const {
  REACT_APP_GOOGLE_BOOKS_API_KEY,
  REACT_APP_GOOGLE_BOOKS_API_URL
} = process.env;
console.log(REACT_APP_GOOGLE_BOOKS_API_URL);

class GoogleSearch {
  static search = async term => {
    try {
      const res = await fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}?q=${term}&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}
        `);
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
  };

  static searchById = async id => {
    try {
      const res = await fetch(`${REACT_APP_GOOGLE_BOOKS_API_URL}/${id}
    `);
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
  };
}

export default GoogleSearch;
