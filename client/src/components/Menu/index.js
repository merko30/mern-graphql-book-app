import React from 'react';
import MoreIcon from './components/MoreIcon';

class Menu extends React.Component {

    render() {
        const { show, handleMenu, children } = this.props;
        return (
            <div className="absolute pin-r pin-t flex">
                {show ?
                    <ul
                        className="list-reset border border-solid border-grey bg-white p-3 mr-2 mt-4 rounded-lg">
                        {children}
                    </ul> : null}
                <MoreIcon handleClick={handleMenu} />
            </div>
        )
    }
}

export default Menu;
