import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';



class TrailCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">

{/* Trail Image */}

        <picture>
            <img src={require("./hiking.jpg")}
            alt="Hiking"
            />
        </picture>

{/* Trail Name and mini details (Address / Rating)*/}
        <h3>
            <span className="card-trailname">
            {this.props.trailProp.name}
            </span>
        </h3>
            <p>Address: {this.props.trailProp.address}</p>
            <p>Rating (0-5): {this.props.trailProp.rating}</p>


{/* Details button / Link */}
        <Link
            to={`/trails/${this.props.trailProp.id}`}>

            <Button
                variant="secondary"
                size="lg"

            >Details
            </Button>

        </Link>



        </div>
      </div>
    );
  }
}

export default TrailCard;