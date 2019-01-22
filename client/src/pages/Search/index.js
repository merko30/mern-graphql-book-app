import React, { Component } from 'react';

import GoogleSearch from '../../API/search';

import { BookListItem, Error, Loading } from '../../components';

export default class Search extends Component {

    state = {
        searchTerm: "",
        searchResults: [],
        error: {},
        loading: false,
        timeout: 0
    }


    searchBooks = async () => {
        try {
            let data = await GoogleSearch.search(this.state.searchTerm)
            this.setState({ searchResults: data.items, loading: false })
        } catch (error) {
            this.setState({ error })
        }

    }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value }, () => {
            clearTimeout(this.state.timeout);
            this.setState({
                searchResults: [],
                loading: true,
                timeout: setTimeout(() => {
                    this.searchBooks();
                }, 300)
            })
        })

    }


    render() {
        const { searchResults, error, searchTerm, loading } = this.state;
        return (
            <ul className="p-0 mx-3">
                <input
                    value={searchTerm}
                    onChange={this.handleChange}
                    placeholder="Search books..."
                    className="block p-4 w-full bg-grey-lighter rounded-lg shadow-inner my-2" />
                {error && <Error error={error.message} />}
                {loading && <Loading />}
                {searchResults && searchResults.map(s => {
                    return (
                        <div key={s.id}>
                            <BookListItem book={s} />
                        </div>
                    );
                })}
            </ul>
        )
    }
}
