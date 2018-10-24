import React, { Component } from 'react';

import GoogleSearch from '../../API/search';

import { OptionsMenu, Loading } from '../../components';

import shorten from '../../helpers/shortenAuthorName';

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            loading: false,
            showMenu: false,
            error: ""
        }
    }

    componen

    handleMenu = () => {

        this.setState({
            showMenu: !this.state.showMenu
        })


    }



    componentWillMount() {
        this.setState({
            loading: true
        })
        const { match: { params: { id } } } = this.props;
        try {
            GoogleSearch.searchById(id).then((data) => {
                this.setState({
                    book: data,
                    loading: false
                })
            })
        } catch (err) {
            this.setState({ error: err.message })
        }

    }

    render() {
        const { showMenu, loading, book: { volumeInfo, id }, error } = this.state;
        return (
            <div className="container" >
                {error && <p style={{ color: "crimson", margin: '1em' }}>{error}</p>}
                {loading && <Loading />}
                {Object.values(this.state.book).length > 0 &&
                    (<div className="flex book-details">
                        {localStorage.getItem('token') && <div><i className="fa fa-ellipsis-v more" onClick={this.handleMenu}></i>

                            <OptionsMenu
                                show={showMenu}
                                handleClose={this.handleMenu}
                                book={{ title: volumeInfo.title, bookID: id, authors: volumeInfo.authors, cover: volumeInfo.imageLinks.thumbnail }} /></div>}

                        <div className="book-details-image">

                            {volumeInfo.imageLinks &&
                                <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />}

                            {volumeInfo.averageRating &&
                                <p>Rating:  <i className="fa fa-star"></i> {volumeInfo.averageRating}</p>}

                            {volumeInfo.pageCount &&
                                <p>Page count: {volumeInfo.pageCount}</p>}

                        </div>

                        <div className="book-details-about">
                            <h2>{volumeInfo.title}</h2>
                            {volumeInfo.authors.map((a, i) => {
                                return <h4 key={i} className="author detail-author">{shorten(a)}</h4>
                            })}
                            <span className="spec">Publisher: {volumeInfo.publisher}</span>
                            <p className="book-details-description" dangerouslySetInnerHTML={{ __html: volumeInfo.description }}></p>
                        </div>
                    </div>)}


            </div>
        )

    }
}

export default BookDetails;