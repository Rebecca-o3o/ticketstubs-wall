import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';

import {Menu} from './menu';
import {Footer} from './footer';


//===== components =====//

export class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }



    render() {

        return (

            <div>

                <header>
                    <Menu />
                </header>

                <div>
                    you are at your wall component
                </div>

                <Footer />

            </div>
        );
    }
}
