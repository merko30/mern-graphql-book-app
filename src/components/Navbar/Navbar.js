import React from 'react'

import { Link } from 'react-router-dom';

import history from '../../history';

import GoogleSearch from '../../API/search';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollingLock: false,
            height: 0,
            search: ""
        }

    }


    componentDidMount() {
        const height = this.refs.nav.clientHeight;
        this.setState({ height });
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.scrollY > this.state.height) {
            this.setState({
                scrollingLock: true
            });
            document.body.style.paddingTop = this.refs.nav.offsetHeight + "px";
        } else if (window.scrollY < this.state.height) {
            this.setState({
                scrollingLock: false
            });
            document.body.style.paddingTop = 0;
        }

    }


    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    searchBooks = () => {
        GoogleSearch.search(this.state.search).then((data) => {
            history.push('/results', { data: data })
        }).catch(err => history.push('/results', { err }))
    }

    render() {
        return (
            <div ref="nav" className={this.state.scrollingLock ? 'fixed-nav' : 'nav'}>

                <h1><Link to="/" className="home-link">BookApp</Link></h1>

                <ul className="nav-list">

                    <div className="search-container">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search"
                            className="search-input"
                            onChange={this.handleChange} />

                        <button
                            disabled={this.state.search.length === 0}
                            onClick={this.searchBooks}
                            className="search-button">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>

                    {!localStorage.getItem('token') && <li className="nav-list-item">
                        <Link to="/register" className="nav-link">Register</Link>
                    </li>}

                    {!localStorage.getItem('token') && <li className="nav-list-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>}

                    {localStorage.getItem('token') && <li className="nav-list-item">
                        <button className="nav-link" onClick={this.handleLogout}>Logout</button>
                    </li>}

                </ul>

            </div>
        );
    }
}

export default Navbar;