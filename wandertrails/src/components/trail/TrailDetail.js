import React, { Component } from 'react';
import TrailManager from '../../modules/TrailManager';
import { Link } from "react-router-dom";
import './TrailDetail.css'
import Button from 'react-bootstrap/Button';

class TrailDetail extends Component {

    state = {
        name: "",
        address: "",
        date: "",
        rating: "",
        userId: "",
        // difficultyId: "",
        comments: "",
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
                // difficultyId:
                comments: trail.comments,
                archived: false,
                loadingStatus: false
            });
        });
    }

    render() {
      return (
        <div className="card">
          <div className="card-content">
            <picture>
              <img src={require('./hiking.jpg')} alt="Hiking" />
            </picture>
            <h3><span style={{ color: 'darkslategrey' }}>{this.state.name}</span></h3>
            <p>Address: {this.state.address}</p>
            <p>Date: {this.state.date}</p>
            <p>Rating: {this.state.rating}</p>
            <p>Comments: {this.state.comments}</p>

            <Button
                variant="danger"
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.handleDelete}
            >Delete
            </Button>

            <Link to={`/trails/${this.props.trailId}/edit`}>

            <Button
                variant="dark"
            >Edit
            </Button>

            </Link>




          </div>
        </div>
      );
    }
}

export default TrailDetail;