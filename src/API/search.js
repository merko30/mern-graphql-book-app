const API_KEY = 'GOOGLE BOOKS API';


class GoogleSearch {

    static search = (term) => {
        return fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&key=${API_KEY}
        `).then(res => res.json())
            .catch(err => console.log(err))
    }

    static searchById = (id) => {
        return fetch(`https://www.googleapis.com/books/v1/volumes/${id}
    `).then(res => res.json())
            .catch(err => console.log(err))
    }


}

export default GoogleSearch;