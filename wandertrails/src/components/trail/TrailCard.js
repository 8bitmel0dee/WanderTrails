import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';




class TrailCard extends Component {
  render() {
    return (

// Bootstrap Cards

      <div className="card text-white" style={{backgroundColor: '#233D4D', width: 500}}>
        <div className="card-content">

{/* Trail Image */}

        <picture>
            {/* <img src={require("./hiking.jpg")} */}

            {/* alt="Hiking" */}
            <img className="trailPic"style={{border: '2px solid #ffffff'}} src={this.props.trailProp.imageTrail}/>
        </picture>
        <br>
        </br>

{/* Trail Name and mini details (Address / Rating)*/}
        <h3>
            <span className="card-trailname">
            {this.props.trailProp.name}
            </span>
        </h3>
        <br></br>
            <p style={{fontSize: 20}}>Location: {this.props.trailProp.address}</p>
            <p style={{fontSize: 20}}>Rating (0-5): {this.props.trailProp.rating}</p>
            <p style={{fontSize: 20}}>Difficulty: {this.props.trailProp.difficulty}</p>

<br></br>

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