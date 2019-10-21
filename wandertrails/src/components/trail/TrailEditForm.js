import React, { Component } from "react";
import TrailManager from "../../modules/TrailManager";

import "./TrailEditForm.css"

class TrailEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        address: "",
        date: "",
        rating: "",
        userId: "",
        difficultyId: "",
        comments: "",
        archived: "",
        loadingStatus: true,
        //trails: []
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingTrail = evt => {
        evt.preventDefault();
        this.setState({ loadingStatus: true });
        const editedTrail = {
            id: this.props.match.params.trailId,
            name: this.state.name,
            address: this.state.address,
            date: this.state.date,
            rating: +this.state.rating,
            userId: +sessionStorage.getItem("credentials"),
            //difficultyID:
            comments: this.state.comments,
            archived: false
        };

        TrailManager.update(editedTrail).then(() =>
            this.props.history.push("/trails")
        );
    };

    componentDidMount() {
        TrailManager.getOne(this.props.match.params.trailId).then(trail => {
            TrailManager.getAll().then(parsedTrails => {
                this.setState({
                    name: trail.name,
                    address: trail.address,
                    date: trail.date,
                    rating: trail.rating,
                    //difficultyID:
                    userId: trail.userId,
                    comments: trail.comments,
                    loadingStatus: false,
                    archived: false,
                    trails: parsedTrails
                });
            });
        });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="name">Name of Trail</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="name"
                                value={this.state.name}
                            />

                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="address"
                                value={this.state.address}
                            />

                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="date"
                                value={this.state.date}
                            />

                            <label htmlFor="rating">Rating (1-5)</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="rating"
                                value={this.state.rating}
                            />

                            <label htmlFor="Comments">Comments</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="comments"
                                value={this.state.comments}
                            />

                            {/* <select
                className="form-control"
                id="employeeId"
                value={this.state.employeeId}
                onChange={this.handleFieldChange}
              >
                {this.state.employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select> */}
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.updateExistingTrail}
                                className="btn btn-primary"
                            >
                                Submit
              </button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default TrailEditForm;