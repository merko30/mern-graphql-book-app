import React from 'react'

import { UserBookItem } from '../../components';

const UserBookList = ({ books }) => {
    return (
        <ul className="user-book-list">
            <h4 className="p2p1">All your books</h4>
            {books.length > 0 && books.map(b => {
                return <UserBookItem book={b} key={b._id} />
            })}
        </ul>
    )
}

export default UserBookList;
