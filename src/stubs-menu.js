import React from 'react';
import {Link} from 'react-router';
import { slide as Menu } from 'react-burger-menu'


export class StubsMenu extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        // console.log(this.props);
        return (

            <Menu
                customBurgerIcon={ <img
                    id="hamburgermenu"
                    src="/img/hamburgermenu.svg" /> }
                customCrossIcon={ <img
                    id="closemenu"
                    src="/img/close.svg" /> }
                // burgerButtonClassName={ "my-class" }
            >
                <Link to="/">Home</Link>
                {/* <Link to="/wall/:userid">My Wall</Link> */}
                <Link to="/events/:userid">My Eventlist</Link>
                <a
                    onClick={ this.props.showUploader }
                    style={{
                        cursor: 'pointer'
                    }}
                >Add a new stub</a>

                {/* <a id="home" className="menu-item" href="/">Home</a> */}

                <a href="/api/logout">Logout</a>
            </Menu>
        );
    }
}
