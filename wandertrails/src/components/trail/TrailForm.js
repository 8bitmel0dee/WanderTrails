import React, { Component } from "react";
import TrailManager from "../../modules/TrailManager";
import './TrailForm.css'
import Button from 'react-bootstrap/Button';


class TrailForm extends Component {
  state = {
    name: "",
    address: "",
    date:"",
    rating:"",
    difficulty:"",
    comments:"",
    imageTrail:"",
    loadingStatus: false,
    userId:""
  };

  handleFieldChange = evt => {
    console.log("this is event.target.id", evt.target.id);
    console.log("this is event.target.value", evt.target.value);
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    console.log("this is state to change", stateToChange);
    this.setState(stateToChange);
  };

  componentDidMount(){
      // Get all trails from db
    TrailManager.getAll().then(parsedTrails => {
        console.log("trails from db", parsedTrails)
        // Take trails from db and set them to state
        this.setState({trails: parsedTrails})
    })
  }

  /*  Local method for validation, set loadingStatus, create trail object, invoke the TrailManager post method, and redirect to the full trail list
   */
  constructNewTrail = evt => {
    evt.preventDefault();
    if (this.state.name === "" || this.state.address === "") {
      window.alert("Please input a trail name and address.");
    } else {
      this.setState({ loadingStatus: true });
      const trail = {
        name: this.state.name,
        address: this.state.address,
        date: this.state.date,
        rating: +this.state.rating,
        comments: this.state.comments,
        difficulty: +this.state.difficulty,
        imageTrail: this.state.imageTrail,
        archived: false,
        userId: +sessionStorage.getItem("credentials") // convert to number
      };

      // Create the trail and redirect user to trail list
      TrailManager.post(trail).then(() =>
        this.props.history.push("/trails")
      );
    }
  };

  render() {
    return (
      <>
        <form class="pure-form pure-form-stacked">
          <fieldset>
            <div className="formgrid">

              <label htmlFor="name">Name</label>
                <input
                  type="text"
                  required
                  onChange={this.handleFieldChange}
                  id="name"
                  placeholder="Trail name"
              />

              <label htmlFor="address">Address</label>
                <input
                  type="text"
                  required
                  onChange={this.handleFieldChange}
                  id="address"
                  placeholder="Address"
              />

              <label htmlFor="date">Date</label>
                <input
                  type="date"
                  required
                  onChange={this.handleFieldChange}
                  id="date"
                  placeholder="Date"
              />

              <label htmlFor="date">Rating (0-5) </label>
                <input
                  type="text"
                  required
                  onChange={this.handleFieldChange}
                  id="rating"
                  placeholder="Rating"
              />

              <label htmlFor="date">Comments</label>
                <input
                  type="text"
                  required
                  onChange={this.handleFieldChange}
                  id="comments"
                  placeholder="Comments"
              />

              <label htmlFor="date">Difficulty (0-3) </label>
                <input
                  type="text"
                  required
                  onChange={this.handleFieldChange}
                  id="difficulty"
                  placeholder="Level of difficulty"
              />

              <label htmlFor="imageTrail">Upload Image</label>
                <input
                  type="url"
                  onChange={this.handleFieldChange}
                  id="imageTrail"
                  placeholder = "Direct image URL, Example: https://i.imgur.com/eTrPwAG.jpg"
              />

            {/* <select
                className="form-control"
                id="sort"
                value={this.state.rating}
                onChange={this.handleFieldChange}
              >
               {this.state.trails.map(singleTrail => (
                  <option key={singleTrail.rating} value={singleTrail.id}>
                    {singleTrail.name}
                  </option>
                ))}
              </select> */}


              <div className="alignRight">
                <Button variant="success" size="lg"
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.constructNewTrail}

                > Submit
                </Button>
              </div>

            </div>
          </fieldset>
        </form>
      </>
    );
  }
}

export default TrailForm;