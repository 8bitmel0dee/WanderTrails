import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './NavBar.css';
import auth0Client from "../auth/Auth";
import Button from 'react-bootstrap/Button';




class NavBar extends Component {

  signOut = () => {
    auth0Client.signOut();
    sessionStorage.clear()
    this.props.history.replace("/");
  };

  render(){

    return (
      <header>
        <h1 className="site-title">Wander Trails<br />
          <small>“I took a walk in the woods and came out taller than trees.” – Henry David Thoreau</small>
        </h1>
        <nav>
          <ul className="container">
          <li><Link className="nav-link" to="/">Home</Link></li>
            {!auth0Client.isAuthenticated() ? (
              <button className="btn btn-success" onClick={auth0Client.signIn}>Sign In</button>
        ) : (
            <React.Fragment>
             <label>
                 <br></br>
                {auth0Client.getProfile().name}
              </label>
              
              <Button
                variant="outline-dark" size="lg"
                onClick={this.signOut}
              >
                Sign Out
              </Button>

            <li><Link className="nav-link" to="/trails">Trails</Link></li>
            </React.Fragment>

        )}
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(NavBar);