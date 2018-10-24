import React from 'react';
import { Link } from 'react-router-dom';

import { OptionsMenu } from '../../components';

import shorten from '../../helpers/shortenAuthorName';


class UserBookItem extends React.Component {

    state = {
        show: false
    }

    handleMenu = () => {
        this.setState({
            show: !this.state.show
        })
    }

    displayAuthors = (authors) => {
        authors.map(a => {
            return <h6>{shorten(a)}</h6>
        })
    }

    render() {
        const { book: { title, bookID, status, authors, cover } } = this.props;
        const { show } = this.state;
        return (
            <li className="user-book-list-item">
                <Link to={`/book/details/${bookID}`} className="info">
                    <div className="flex">
                        <img src={cover} alt={title} style={{ height: "100px", width: "70px" }} />
                        <div style={{ margin: '0 1em' }}>

                            <h4>{title}</h4>
                            <div className="flex">
                                {authors.map((a, i) => {
                                    return <h5 key={i} className="book-list-item-author">{shorten(a)}</h5>
                                })}
                            </div>
                        </div>
                    </div>
                </Link>
                <i className="fa fa-ellipsis-v more" onClick={this.handleMenu}></i>
                <OptionsMenu
                    show={show}
                    handleClose={this.handleMenu}
                    book={{ title: title, bookID: bookID, status: status, authors: authors }} />
            </li>
        )
    }
}

export default UserBookItem;
