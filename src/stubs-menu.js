import React from 'react';
import {Link} from 'react-router';
import { slide as Menu } from 'react-burger-menu'


export class StubsMenu extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (

            <Menu
                customBurgerIcon={ <img id="hamburgermenu" src="/img/hamburgermenu.svg" /> }
                customCrossIcon={ <img id="closemenu" src="/img/close.svg" /> }
            >
                <Link to="/">Home</Link>
                <Link to="/wall/:userid">My Wall</Link>
                <Link to="/events/:userid">My Eventlist</Link>
                <Link to="/events/:userid/addticketstub">Add a ticket stub</Link>

                {/* <a id="home" className="menu-item" href="/">Home</a> */}
                {/* <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}

                <a href="/api/logout">Logout</a>
            </Menu>
        );
    }
}
