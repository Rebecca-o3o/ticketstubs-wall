import React from 'react';
import {Link} from 'react-router';


export class Menu extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <nav>
                {/* <img id="hamburgermenu" src="img/hamburgermenu.svg" alt= "Menue"/> */}
                <ul className="menue">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/wall/:userid">My Wall</Link></li>
                    <li><Link to="/events/:userid">My Eventlist</Link></li>
                    <li><Link to="/events/:userid/addticketstub">Add a ticket stub</Link></li>
                    <li><a href="/api/logout">Logout</a></li>
                    {/* {this.props.children} */}
                </ul>
            </nav>
        );
    }
}
