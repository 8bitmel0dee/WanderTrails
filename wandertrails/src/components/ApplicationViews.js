import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import TrailList from "./trail/TrailList";
import TrailDetail from "./trail/TrailDetail";
import TrailForm from "./trail/TrailForm";
import TrailEditForm from "./trail/TrailEditForm";
import Auth0Client from "./auth/Auth";
import Callback from "./auth/Callback";

class ApplicationViews extends Component {



  render() {
    return (
      <React.Fragment>

        <Route
          exact
          path="/"
          render={props => {
            return <Home />;
          }}
        />
        <Route
          exact
          path="/trails"

          render={props => {
            if (Auth0Client.isAuthenticated()) {
              return <TrailList {...props} />;
            } else {
                Auth0Client.signIn();
                return null;
            }
        }}
        />


        <Route
          path="/trails/new"
          render={props => {

              return <TrailForm {...props} />

          }}
        />

        <Route
          exact
          path="/trails/:trailId(\d+)/"
          render={props => {
            // Pass the trailId to the TrailDetail Component
            console.log("this is props", props);

            return <TrailDetail {...props} trailId={parseInt(props.match.params.trailId)}/>
            }}

        />


        <Route
          path="/trails/:trailId(\d+)/edit"
          render={props => {
            return <TrailEditForm {...props} />;
          }}
        />
        {/* <Route path="/login" component={Login} /> */}


        <Route exact path="/callback" component={Callback} />

      </React.Fragment>
    );
  }
}

export default ApplicationViews;