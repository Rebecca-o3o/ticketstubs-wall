import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from './axios';

import {Menu} from './menu';
import {Footer} from './footer';
import SingleStub from './single-stub';
import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {loadTicketstubs} from './actions';


//===== components =====//

export class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUploaderWindow: false
        };

        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.submitTicketStub = this.submitTicketStub.bind(this);
    }

    componentDidMount(){
        // console.log("Wall component did mount - this.props:", this.props);
        // console.log("Wall component did mount - this.state:", this.state);
        this.props.dispatch(loadTicketstubs());
    }


    showUploader(){
        // console.log("klick und showuploader aktiviert");
        this.setState({
            showUploaderWindow: true
        });
    }

    hideUploader(){
        // console.log("klick und hideuploader deaktiviert");
        this.setState({
            showUploaderWindow: false,
            error: null
        });
    }

    handleInputChange(e){
        // console.log("fn: handleInputChange");
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFileChange(e){
        this.setState({
            file: e.target.files[0]
        });
    }

    submitTicketStub(){
        // e.preventDefault()
        const {file, event, date, time, venue} = this.state;

        var formData = new FormData;
        formData.append('file', file);
        formData.append('event', event);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('venue', venue);

        console.log("about to start axios submitTicketStub with form data:", formData);

        axios.post('/UploadTicketStub', formData).then((serverResponse)=>{
            // console.log("in axios post /UploadTicketStub");
            // console.log(formData);
            // console.log(serverResponse.data);
            this.setState({
                // TODO: immediatly display stub here
                showUploaderWindow: false
            });
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong! Please try again!'
            });
            console.log(err);
        });
    }


    render() {

        // if(!this.state.userInfo) {
        //     return <div className='loading'>Loading...</div>;
        // }

        const randomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const {dispatch, stubs} = this.props;

        const renderTicketStubs = () => {

            // console.log("fn: renderTicketStubs");

            return stubs.map(singleStub => {

                console.log("fn: stubs.map");

                return (
                    <div>

                        <div>
                            single stub ID: {singleStub.id}
                        </div>

                        <SingleStub
                            id={singleStub.id}
                            stubImgSrc={singleStub.stubImgUrl}
                            stubEvent={singleStub.eventname}
                            stubDate={singleStub.eventdate}
                            stubTime={singleStub.eventtime}
                            stubVenue={singleStub.eventvenue}
                            // showUploader={this.showUploader}
                            // handleInputChange = {(e) => this.handleInputChange(e)}
                            // handleFileChange = {(e) => this.handleFileChange(e)}
                            // submitTicketStub={this.submitTicketStub}
                            // showUploader={this.showUploader}
                            // hideUploader={this.hideUploader}
                        />


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
                    <ul className="ticketstubs-wall-container">

                        you are at your wall component

                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando

                            {/* <img className="icon-move-object" src="/img/move-object.svg" alt= "icon move object"/> */}

                            <AddIcon
                                showUploader={this.showUploader}
                            />

                            {/* <img className="icon-edit-ticketstub" src="/img/pencil-edit.svg" alt= "icon add ticket stub"/> */}


                        </li>

                        {stubs && renderTicketStubs()}

                        <SingleStub />

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


                        {this.state.error && <div>{this.state.error}</div> }

                        {this.state.showUploaderWindow && <UploadTicketStub
                            handleInputChange = {(e) => this.handleInputChange(e)}
                            handleFileChange = {(e) => this.handleFileChange(e)}
                            submitTicketStub={this.submitTicketStub}
                            showUploader={this.showUploader}
                            hideUploader={this.hideUploader}/>}

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
        stubs: state.stubs
    };
}

export default connect(mapStateToProps)(Wall);
