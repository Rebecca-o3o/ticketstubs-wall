import React from 'react';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <footer>
        <p>

          <a href="https://www.instagram.com/myticketwall">
            <i className="fab fa-instagram fa-2x social-link"></i>
          </a>

          <a href="https://www.pinterest.de/myticketwall/ticket-collections/">
            <i className="fab fa-pinterest-square fa-2x social-link"></i>
          </a>

          <a href="https://twitter.com/myticketwall">
            <i className="fab fa-twitter-square fa-2x social-link"></i>
          </a>

          <a href="https://www.facebook.com/myticketwall/">
            <i className="fab fa-facebook-square fa-2x social-link"></i>
          </a>

        </p>

        <p>
          Copyright © 2017-2018 | All rights reserved.
        </p>

      </footer>
    </div>);
  }
}
