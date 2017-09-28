import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable';

import axios from './axios';
import {StubsMenu} from './stubs-menu';
import {CommentsMenu} from './wall-comments';
import {Footer} from './footer';
import SingleStub from './single-stub';
import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {loadTicketstubs, saveStubPosition} from './actions';
import {BlankTicketIcons, UploadedTicketIcons} from './stub-action-icons';


//===== components =====//

export class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUploaderWindow: false,
            selected: "",
            hover: "",
            activeDrags: 0,
            deltaPosition: {
                x: 0,
                y: 0
            },
            // controlledPosition: {
            //     x: -400,
            //     y: 200
            // }
        };

        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.submitTicketStub = this.submitTicketStub.bind(this);

        this.handleDrag = this.handleDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);

        this.getHoverState = this.getHoverState.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
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
            location.replace("/");
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong! Please try again!'
            });
            console.log(err);
        });
    }


    getHoverState() {
        console.log("getHoverState");
        if (this.state.hover) {
            return true;
        }
        return false;
    }

    onHover() {
        console.log("onhover about to set state");
        this.setState({
            hover: true
        });
    }

    onMouseEnter() {
        console.log("onMouseEnter about to set state");
        this.setState({
            hover: true
        });
    }

    onMouseOut() {
        console.log("mouse out about to set state");
        this.setState({
            hover: false
        });
    }


    //The ui parameter is typically a hash; its properties depend on the event being raised.
    //on movement ui will contain the current position and offset
    handleDrag(e, ui) {
        // console.log("fn handleDrag");

        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
        // console.log(this.state.deltaPosition);

    }

    onStart() {
        this.setState({
            activeDrags: ++this.state.activeDrags
        });
    }

    onStop() {
        this.setState({
            activeDrags: --this.state.activeDrags
        });
        // console.log("moved stubs id:", id);
        // console.log("stoped moved stubs by xy:", this.state.deltaPosition);
        // console.log("stoped moved stubs by xy:", this.propsid);

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
        const dragHandlers = {
            onStart: this.onStart,
            onStop: this.onStop};

        // const {deltaPosition, controlledPosition} = this.state;

        const renderTicketStubs = () => {

            // console.log("fn: renderTicketStubs");

            return stubs.map(singleStub => {

                // console.log("fn: stubs.map - singleStub:", singleStub);
                // console.log("fn: stubs.map - stubImgUrl:", singleStub.stubImgUrl);

                const imageUrl = singleStub.stubImgUrl;
                // console.log("this is our id", singleStub.id);

                return (

                    // <div
                    //     onHover={this.onHover}
                    //     onMouseOut={this.onMouseOut}
                    //     onMouseEnter={this.onMouseEnter}
                    // >

                        <Draggable
                            bounds="parent"
                            handle=".cursor"
                            onDrag={this.handleDrag}
                            id={singleStub.id}
                            {...dragHandlers}

                        >

                            <div
                                className="box no-cursor"
                                style={{ backgroundImage: `url(${imageUrl})` }}>

                                {/* {this.state.hover &&  */}
                                    <UploadedTicketIcons
                                    id={singleStub.id}
                                />
                            {/* } */}

                            </div>
                        </Draggable>
                    // </div>
                );
            });
        };


        return (

            <div>

                <header>
                    <StubsMenu
                        showUploader={this.showUploader}
                    />
                    {/* <CommentsMenu /> */}
                </header>

                <div className="ticketstubs-wall-container">

                    {stubs && renderTicketStubs()}

                    {this.state.error && <div>{this.state.error}</div> }

                    {this.state.showUploaderWindow && <UploadTicketStub
                        handleInputChange = {(e) => this.handleInputChange(e)}
                        handleFileChange = {(e) => this.handleFileChange(e)}
                        submitTicketStub={this.submitTicketStub}
                        showUploader={this.showUploader}
                        hideUploader={this.hideUploader}/>}


                    <Draggable
                        bounds="parent"
                        handle=".cursor"
                        onDrag={this.handleDrag}
                        {...dragHandlers}>

                        <div className="box no-cursor" style={{
                            // backgroundColor: randomColor()
                            backgroundColor: 'rgb(240, 240, 240)'
                        }}>
                            <BlankTicketIcons />
                            <div>
                                <AddIcon
                                    showUploader={this.showUploader}
                                />
                                <div>Add a new stub to your wall by clicking on the add icon!</div>
                                {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}

                            </div>
                        </div>
                    </Draggable>


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
