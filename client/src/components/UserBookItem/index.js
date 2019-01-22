import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


import shorten from '../../helpers/shortenAuthorName';
import BookMenu from '../Menu/BookMenu';


class UserBookItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.menuRef = React.createRef();
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

    handleMenu = () => {
        this.setState({
            show: !this.state.show
        })
    }

    displayAuthors = (authors) => {
        return authors.map((a, i) => {
            return <h5 key={i} className="text-grey-darker">{shorten(a)}</h5>
        })
    }

    render() {
        const { book: { title, bookID, authors, cover } } = this.props;
        const { show } = this.state;
        return (
            <li className="list-reset flex my-5 md:w-1/2 lg:w-1/3 min-h-12 relative">
                <Link to={`/book/details/${bookID}`} className="no-underline text-black">
                    <div className="flex flex-col md:flex-row">
                        <div>
                            <img src={cover} alt={title} className="object-cover" />
                        </div>
                        <div className="mx-1 md:mx-4 w-32">

                            <h4 className="text-grey-darkest">{title}</h4>
                            <div>
                                {this.displayAuthors(authors)}
                            </div>
                        </div>
                    </div>
                </Link>
                <BookMenu
                    show={show}
                    ref={this.menuRef}
                    handleMenu={this.handleMenu}
                    book={this.props.book} />
            </li>
        )
    }
}

export default UserBookItem;
