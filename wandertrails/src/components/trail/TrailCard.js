import React, { Component } from "react";
import { Link } from "react-router-dom";

class TrailCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <picture>
            <img src={require("./hiking.jpg")} alt="Hiking" />
          </picture>

          <h3>
            Name:{" "}
            <span className="card-trailname">{this.props.trailProp.name}</span>
          </h3>
          <p>Address: {this.props.trailProp.address}</p>
          <p>Rating (0-5): {this.props.trailProp.rating}</p>



        <Link to={`/trails/${this.props.trailProp.id}`}>

            <button>Details</button>

        </Link>



        </div>
      </div>
    );
  }
}

export default TrailCard;