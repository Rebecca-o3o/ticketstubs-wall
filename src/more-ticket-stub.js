import React from 'react';
// import ReactDOM from 'react-dom';

import axios from './axios';




export class MoreStubActions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showMoreMenu: true
        };
        this.delete = this.delete.bind(this);
    }

    delete(){
        // console.log("about to delete id:", this.props.id);
        // console.log("this.props", this.props);

        var stubId = this.props.id;
        axios.post('/api/delete', {stubId}).then((res) => {
            // console.log(res);
            this.setState({
                showMoreMenu: false
            });
            location.replace("/");
        }).catch((err)=>{
            this.setState({
                error: 'Ups! Something went wrong! Please try again!'
            });
            console.log(err);
        });
    }




    render() {
        // console.log("render MoreStubActions Comp with this.props:", this.props);

        var deleteButton = <button
            onClick={this.delete}
            className="button-delete"
        >Delete</button>;

        return (

            <div className="stub-action-overlay">

                <div
                    className="x-close"
                    onClick={this.props.closeMoreMenu} >x
                </div>

                {deleteButton}

            </div>
        );
    }
}
