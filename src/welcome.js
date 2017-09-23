import React from 'react';
// import {Link} from 'react-router';


//===== components =====//

export class Welcome extends React.Component{
    constructor (props) {
        super(props);
    }
    render() {
        // console.log("React Component - Welcome - this.props: ",this.props);
        return (
            <div className="welcome-section">

                Welcome to your Online TicketStub Wall!

                {this.props.children}

            </div>
        );
    }
}
