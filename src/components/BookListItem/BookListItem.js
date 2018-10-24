import React from 'react';
import { Link } from 'react-router-dom';

import shorten from '../../helpers/shortenAuthorName';

const BookListItem = ({ book: { volumeInfo: { title, authors, imageLinks, description }, id } }) => {
    return (
        <li className="book-list-item">
            {imageLinks && imageLinks.smallThumbnail && <img src={imageLinks.smallThumbnail} className="book-list-item-image" alt={title} />}
            <div style={{ flex: "2" }}>
                {title && <h3 className="book-list-item-title">{title}</h3>}
                <div className="book-list-item-authors">
                    {authors && authors.map(a => {
                        return <h5
                            className="book-list-item-author" key={a}>
                            {shorten(a)}
                        </h5>
                    })}
                </div>
                {description && <p className="book-list-item-description">{description}</p>}
                <button className="read-more-button"><Link to={`/book/details/${id}`}>Read more</Link></button>
            </div>
        </li >
    )
}

export default BookListItem;
