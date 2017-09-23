import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from './axios';

import {Menu} from './menu';
import {Footer} from './footer';
import {SingleTicketStub} from './single-ticket-stub';
import {getTicketstubs, addTicketstub} from './actions';


//===== components =====//

export class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.dispatch(getTicketstubs());
        console.log("Wall component did mount");
    }


    render() {

        const randomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const {dispatch, getTicketstubs} = this.props;

        const renderTicketstubs = () => {

            return getTicketstubs.map(singleStub => {
                return (
                    <div>

                        <div>
                            <SingleTicketStub
                                className="single-ticketstub"
                                id={singleStub.id}
                                imgsrc={singleStub.imgUrl}/>
                        </div>

                    </div>
                );
            });
        };


        return (

            <div>

                <header>
                    <Menu />
                </header>

                <div>
                    you are at your wall component
                    <ul className="ticketstubs-wall-container">
                        {/* {getTicketstubs && renderTicketstubs()} */}

                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando
                        </li>
                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando
                        </li>
                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando
                        </li>
                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando
                        </li>
                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando
                        </li>

                    </ul>
                </div>

                <div>
                </div>


                <Footer />

            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        getTicketstubs: state.getTicketstubs
    };
}

export default connect(mapStateToProps)(Wall);
