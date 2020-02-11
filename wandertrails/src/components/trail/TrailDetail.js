import React, { Component } from 'react';
import TrailManager from '../../modules/TrailManager';
import { Link } from "react-router-dom";
import './TrailDetail.css'
import Button from 'react-bootstrap/Button';
import { AutoInit } from 'materialize-css';

class TrailDetail extends Component {

    state = {
        name: "",
        address: "",
        date: "",
        rating: "",
        userId: "",
        difficulty:"",
        comments: "",
        imageTrail: "",
        archived: false,
        loadingStatus: true,

    }

    handleDelete = () => {
        console.log("this is props", this.props)
        //invoke the delete function in TrailManager and re-direct to the trail list.
        this.setState({loadingStatus: true})
        TrailManager.softDelete(this.props.trailId)
        .then(() => this.props.history.push("/trails"))
    }

    componentDidMount(){
        console.log("TrailDetail: ComponentDidMount");
        //get(id) from TrailManager and hang on to that data; put it into state
        TrailManager.getOne(this.props.trailId)
        .then((trail) => {
            this.setState({
                name: trail.name,
                address: trail.address,
                date: trail.date,
                rating: trail.rating,
                userId: trail.userId,
                difficulty: trail.difficulty,
                comments: trail.comments,
                imageTrail: trail.imageTrail,
                archived: false,
                loadingStatus: false
            });
        });
    }

    render() {
      return (
        <div className="card text-white" style={{backgroundColor: '#233D4D', width: 800, marginTop: 50, marginRight: 'auto', marginBottom: 20, marginLeft: 'auto'}}>
          <div className="card-content">
            <picture>
              <img style={{border: '2px solid #ffffff'}} src={this.state.imageTrail} alt="Hiking" />
            </picture>
            <br>
            </br>
            <h3 className="text-center"><span style={{ color: 'white' }}>{this.state.name}</span></h3>
            <br></br>
            <p className="text-center" style={{fontSize: 20}}>Location: {this.state.address}</p>
            <p className="text-center" style={{fontSize: 20}}>Date: {this.state.date}</p>
            <p className="text-center" style={{fontSize: 20}}>Rating: {this.state.rating}</p>
            <p className="text-center" style={{fontSize: 20}}>Difficulty: {this.state.difficulty}</p>
            <p className="text-center" style={{fontSize: 20}}>Comments: {this.state.comments}</p>




            <div class="btn-toolbar float-right">
            <Link to={`/trails/${this.props.trailId}/edit`}>


            <Button
                className="mb-2 mr-2 float-right"
                size="lg"
                variant="info"

            >Edit
            </Button>
          <br></br>
          <br></br>
            <Button
                className="float-right"
                size="lg"
                variant="danger"
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.handleDelete}
            >Delete
            </Button>



            </Link>


            </div>

          </div>
        </div>
      );
    }
}

export default TrailDetail;