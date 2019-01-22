import React from 'react';
import { Link } from 'react-router-dom';

import shorten from '../../helpers/shortenAuthorName';


const BookListItem = ({ book: { volumeInfo: { title, authors, imageLinks, description }, id } }) => {
    return (
        <li className="list-reset m-4">
            {imageLinks && imageLinks.smallThumbnail && <div>
                <img src={imageLinks.smallThumbnail} className="object-cover" alt={title} />
            </div>
            }
            <div>
                {title && <h2 className="text-grey-darkest">{title}</h2>}
                <div className="text-grey-darker">
                    {authors && authors.map(a => {
                        return <h4 key={a}>
                            {shorten(a)}
                        </h4>
                    })}
                </div>
                {description && <p className="text-grey-dark">{description}</p>}
                <Link
                    className="inline-block my-2 no-underline text-white font-bold font-sm hover:text-blue-dark px-2 py-2 rounded-lg border border-solid border-blue-dark hover:bg-white bg-blue-dark "
                    to={`/book/details/${id}`}>
                    Read more</Link>


            </div>
        </li >
    )
}

export default BookListItem;
