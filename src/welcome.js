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
            <div>

                <div className="welcome-background">


                </div>

                <div className="welcome-section">
                    <h1>Welcome to your Online TicketStubs Wall!</h1>
                    <p>
                        Collecting ticket stubs from every concert you go to?
                    </p>
                    <p>
                        Do you pin them to your wall, glue them in a book or are they just loose all around your place?
                    </p>
                    <p>
                        Have more fun with your memories online!
                    </p>
                    <p>
                        Keep your pictures, videos, and moments at one place.
                        Access and share your greatest concerts from wherever you are!
                    </p>


                    <p>
                        Start right now!
                    </p>

                    <p>

                        <button>Register</button>
                        <button>Login</button>

                    </p>

                </div>

                {this.props.children}

            </div>
        );
    }
}
