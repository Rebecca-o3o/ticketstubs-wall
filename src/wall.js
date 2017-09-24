import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from './axios';

import {Menu} from './menu';
import {Footer} from './footer';
// import {SingleTicketStub} from './single-ticket-stub';
import {AddIcon, UploadTicketStub} from './upload-ticket-stub';
// import {getTicketstubs} from './actions';


//===== components =====//

export class Wall extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showUploaderWindow: false
        };

        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitTicketStub = this.submitTicketStub.bind(this);
    }

    componentDidMount(){
        // this.props.dispatch(getTicketstubs());
        console.log("Wall component did mount");
    }


    showUploader(){
        // console.log("klick und showuploader aktiviert");
        this.setState({
            showUploaderWindow: true
        });
    }

    hideUploader(){
        // console.log("klick und showuploader deaktiviert");
        this.setState({
            showUploaderWindow: false
        });
    }

    handleChange(e) {
        // console.log("handle change:", e.target.files[0]);
        this.setState({
            file: e.target.files[0]
        });
    }

    submitTicketStub(){
        // console.log("starting axios profile pic upload");
        var formData = new FormData;
        formData.append('file', this.state.file);

        axios.post('/UploadTicketStub', formData).then((result)=>{
            console.log(result.data);
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

        // const {dispatch, getTicketstubs} = this.props;

        // const renderTicketstubs = () => {
        //
        //     return getTicketstubs.map(singleStub => {
        //         return (
        //             <div>
        //
        //                 <div>
        //                     <SingleTicketStub
        //                         className="single-ticketstub"
        //                         id={singleStub.id}
        //                         imgsrc={singleStub.imgUrl}/>
        //                 </div>
        //
        //             </div>
        //         );
        //     });
        // };


        return (

            <div>

                <header>
                    <Menu />
                </header>

                <div>
                    <ul className="ticketstubs-wall-container">
                        {/* {getTicketstubs && renderTicketstubs()} */}
                        you are at your wall component

                        <li
                            className="single-ticketstub"
                            style={{backgroundColor: randomColor()}}>Rando

                            <img className="icon-move-object" src="/img/move-object.svg" alt= "icon move object"/>

                            <AddIcon
                                showUploader={this.showUploader}
                            />

                            <img className="icon-edit-ticketstub" src="/img/pencil-edit.svg" alt= "icon add ticket stub"/>


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


                        {this.state.error && <div>{this.state.error}</div> }

                        {this.state.showUploaderWindow && <UploadTicketStub
                            handleChange = {(e) => this.handleChange(e)}
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

//
// function mapStateToProps(state){
//     return {
//         getTicketstubs: state.getTicketstubs
//     };
// }
//
// export default connect(mapStateToProps)(Wall);
