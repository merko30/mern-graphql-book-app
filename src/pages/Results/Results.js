import React, { Component } from 'react';

import { BookListItem } from '../../components';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            error: {}
        }
    }

    componentDidMount() {
        const { location: { state: { data: { error, items } } } } = this.props;

        this.setState({
            error: error,
            searchResults: items
        })

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                error: nextProps.location.state.data.error ? nextProps.location.state.data.error : {},
                searchResults: nextProps.location.state.data.items
            })
        }
    }



    render() {
        const { searchResults, error } = this.state;
        return (
            <ul className="book-list container">
                {error && <h3 style={{ color: "crimson", margin: '1em', textAlign: "center" }}>{error.message}</h3>}
                {searchResults && searchResults.map(s => {
                    return (
                        <BookListItem book={s} key={s.id} />
                    );
                })}
            </ul>
        )
    }
}
