import React from 'react';
// import {Link} from 'react-router';
import {StubsMenu} from './stubs-menu';
import {Footer} from './footer';


//===== components =====//

export class Welcome extends React.Component{
    constructor (props) {
        super(props);
        this.state = {};

        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        // console.log('openRegisterModal - this is:', this);
    }

    render() {
        // console.log("React Component - Welcome - this.props: ",this.props);
        return (
            <div>

                <header>
                    <StubsMenu />
                </header>

                <div className="welcome-background">


                </div>

                <div className="welcome-section">
                    <h1>Welcome to your Online Ticket Stubs Wall!</h1>

                    <div>
                        <p>
                            Collecting ticket stubs from every concert you go to?
                        </p>
                        <p>
                            Do you pin them to your wall, glue them in a book or are they just loose all around your place?
                        </p>

                    </div>


                    <div>
                        <p>
                            Have more fun with your memories online!
                        </p>

                        <div className="horizontal-line">
                        </div>

                        <div className="welcome-features-container">

                            <ul className="welcome-features-list">
                                <li>
                                    <img className="Check-icon" src="/img/check.svg" alt= "Check-icon"/>
                                    Access your Ticket Stubs Wall wherever you are.
                                </li>
                                <li>
                                    <img className="Check-icon" src="/img/check.svg" alt= "Check-icon"/>
                                    Keep your concert memories at one place.
                                </li>
                                <li>
                                    <img className="Check-icon" src="/img/check.svg" alt= "Check-icon"/>
                                    Collect pictures, videos, and moments.
                                </li>
                                <li>
                                    <img className="Check-icon" src="/img/check.svg" alt= "Check-icon"/>
                                    Share your greatest concerts memories!
                                </li>
                                <li>
                                    <img className="Check-icon" src="/img/check.svg" alt= "Check-icon"/>
                                    Keep track of your concert history!
                                </li>
                            </ul>
                        </div>

                        <div className="horizontal-line">
                        </div>

                        <p>
                            Start right now!
                        </p>

                    </div>


                    {/* <p>

                        <button onClick={this.openModal}>Register</button>
                        <button onClick={this.openModal}>Login</button>

                    </p> */}

                    {this.props.children}

                </div>


                <Footer />

            </div>
        );
    }
}
