import React from 'react';
// import {Link} from 'react-router';
import {StubsMenu} from './stubs-menu';
import {Footer} from './footer';

//===== components =====//

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>

      <header>
        <StubsMenu/>
      </header>

      <div className="welcome-background"></div>

      <div className="welcome-section">
        <h1>Welcome to your online Ticketwall!</h1>

        <div>
          <p>
            Collecting tickets and stubs from every concert you go to?
          </p>
          <p>
            Do you pin them to your wall, glue them in a book or are they just loose all around your place?
          </p>

          <p>
            Have more fun with your memories online!
          </p>
        </div>

        <div>

          <div className="horizontal-line"></div>

          <div className="welcome-features-container">

            <div className="feature-item">
              <div className="check-icon">
                <img src="/img/check.svg" alt="Check-icon"/>
              </div>

              <div className="feature-info">
                Access your Ticketwall wherever you are.
              </div>
            </div>

            <div className="feature-item">
              <div className="check-icon">
                <img src="/img/check.svg" alt="Check-icon"/>
              </div>

              <div className="feature-info">
                Keep your concert memories at one place.
              </div>
            </div>

            <div className="feature-item">
              <div className="check-icon">
                <img src="/img/check.svg" alt="Check-icon"/>
              </div>

              <div className="feature-info">
                Collect pictures, videos, and moments.
              </div>
            </div>

            <div className="feature-item">
              <div className="check-icon">
                <img src="/img/check.svg" alt="Check-icon"/>
              </div>

              <div className="feature-info">
                Keep track of your concert history!
              </div>
            </div>


            <div className="feature-item">
              <div className="check-icon">
                <img src="/img/check.svg" alt="Check-icon"/>
              </div>

              <div className="feature-info">
                Share your greatest concerts memories!
              </div>
            </div>

          </div>

          <div className="horizontal-line"></div>

          <p>Try it right now - it's free!</p>

        </div>

        {this.props.children}

      </div>

      <Footer/>

    </div>);
  }
}
