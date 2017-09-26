import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Draggable from 'react-draggable';
import {DraggableCore} from 'react-draggable';

import axios from './axios';
import {StubsMenu} from './stubs-menu';
import {Footer} from './footer';
import SingleStub from './single-stub';
import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
import {loadTicketstubs} from './actions';
import {DragIcon, EditIcon} from './stub-action-icons';


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

        this.getInitialState = this.getInitialState.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
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


    getInitialState() {
        return {
            activeDrags: 0,
            deltaPosition: {
                x: 0, y: 0
            },
            controlledPosition: {
                x: -400, y: 200
            }
        };
    }

    handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
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
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition} = this.state;

        const renderTicketStubs = () => {

            // console.log("fn: renderTicketStubs");

            return stubs.map(singleStub => {

                // console.log("fn: stubs.map - singleStub:", singleStub);
                // console.log("fn: stubs.map - stubImgUrl:", singleStub.stubImgUrl);

                const imageUrl = singleStub.stubImgUrl;

                return (


                    <Draggable bounds="parent" handle=".cursor"
                        // onDrag={this.handleDrag}
                        {...dragHandlers}>
                        <div
                            className="box no-cursor"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                            // style={{ content: `url(${imageUrl})` }}
                            // style={{backgroundColor: randomColor()}}
                        >
                            <DragIcon />
                            {/* <div>You must click my handle to drag me</div> */}
                            {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
                        </div>
                    </Draggable>


                    // <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                    //     <div className="box">
                    //         <div>I track my deltas</div>
                    //         <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                    //     </div>
                    // </Draggable>


                    //{/* <Draggable bounds="parent" handle=".cursor" {...dragHandlers}>
                    //     <div
                    //         className="box no-cursor"
                    //         className="box"
                    //     >
                    //
                    //         <SingleStub
                    //             id={singleStub.id}
                    //             stubImgSrc={singleStub.stubImgUrl}
                    //             stubEvent={singleStub.eventname}
                    //             stubDate={singleStub.eventdate}
                    //             stubTime={singleStub.eventtime}
                    //             stubVenue={singleStub.eventvenue}
                    //
                    //             showUploader={this.showUploader}
                    //             handleInputChange = {(e) => this.handleInputChange(e)}
                    //             handleFileChange = {(e) => this.handleFileChange(e)}
                    //             submitTicketStub={this.submitTicketStub}
                    //             showUploader={this.showUploader}
                    //             hideUploader={this.hideUploader}
                    //         />
                    //     </div>
                    // </Draggable> */}


                );
            });
        };


        return (

            <div>

                <header>
                    <StubsMenu />
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


                    <Draggable bounds="parent" handle=".cursor"
                        // onDrag={this.handleDrag}
                        {...dragHandlers}>
                        <div className="box no-cursor" style={{backgroundColor: randomColor()}}>
                            <DragIcon />
                            <AddIcon
                                showUploader={this.showUploader}
                            />
                            <div>Add a new stub here!</div>
                            {/* <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
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
