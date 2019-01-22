import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import GoogleSearch from '../../API/search';

import { Loading, Error } from '../../components';

import shorten from '../../helpers/shortenAuthorName';
import BookMenu from '../../components/Menu/BookMenu';

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {},
            loading: false,
            show: false,
            error: null
        }

        this.menuRef = React.createRef();
    }

    handleMenu = () => {
        this.setState({
            show: !this.state.show
        })
    }

    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick, false);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBodyClick, false);
    }

    handleBodyClick = (e) => {
        let opener = Array.from(document.getElementsByTagName("i"))[1]
        let m = ReactDOM.findDOMNode(this.menuRef.current)
        if (m && !m.contains(e.target) && e.target !== opener) {
            this.setState({ show: false })
        }
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
            this.setState({ error: err })
        }

    }

    render() {
        const { show, loading, book: { volumeInfo, id }, error } = this.state;
        return (
            <div className="relative h-screen mx-4">
                {error && <Error error={error.message} />}
                {loading && <Loading />}
                {Object.values(this.state.book).length > 0 &&
                    (<div className="mx-auto container flex lg:flex-row flex-col flex-wrap">

                        {localStorage.getItem('token') &&
                            <BookMenu
                                ref={this.menuRef}
                                show={show}
                                handleMenu={this.handleMenu}
                                book={{ title: volumeInfo.title, bookID: id, authors: volumeInfo.authors, cover: volumeInfo.imageLinks.thumbnail }} />}

                        <div>

                            {volumeInfo.imageLinks &&
                                <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />}

                            {volumeInfo.averageRating &&
                                <p>Rating:  <i className="fa fa-star"></i> {volumeInfo.averageRating}</p>}

                            {volumeInfo.pageCount &&
                                <p>Page count: {volumeInfo.pageCount}</p>}

                        </div>

                        <div className="lg:ml-4 lg:w-3/4">
                            <h2>{volumeInfo.title}</h2>
                            {volumeInfo.authors && volumeInfo.authors.map((a, i) => {
                                return <h4 key={i} className="text-gray-dark">{shorten(a)}</h4>
                            })}
                            <span className="spec">Publisher: {volumeInfo.publisher}</span>
                            <p className="text-grey-light" dangerouslySetInnerHTML={{ __html: volumeInfo.description }}></p>
                        </div>
                    </div>)}


            </div>
        )

    }
}

export default BookDetails;