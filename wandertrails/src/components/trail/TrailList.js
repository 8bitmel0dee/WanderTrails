import React, { Component } from 'react'
//import the components we will need
import TrailCard from './TrailCard'
import TrailManager from '../../modules/TrailManager'
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

const options = [
    { value: 'rating', label: 'Sort By Rating' },
    { value: 'difficulty', label: 'Sort By Difficulty' },
    { value: 'date', label: 'Sort By Date' },
  ];

class TrailList extends Component {
    //define what this component needs to render
    state = {
        trailId: "",
        trails: [],
        loadingStatus: true,
        selectedOption: ""
    };

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log('Option selected:', this.state.selectedOption)
            );


            console.log(selectedOption, "sort test - selected option")


            if (selectedOption.value === 'rating') {

                this.state.trails.sort((a, b) => b.rating - a.rating);
            }

            if (selectedOption.value === 'difficulty') {

                this.state.trails.sort((a, b) => b.difficulty - a.difficulty);
            }

            if (selectedOption.value === 'date') {

                this.state.trails.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

    };

    componentDidMount() {
        console.log("TRAIL LIST: ComponentDidMount");

        //userID variable created to only display the trails of the logged in user
        const userId = parseInt(sessionStorage.getItem("credentials"));

        console.log(userId);
        //getAll from TrailManager (with userId) and hang on to that data; put it in state
        TrailManager.getAll(userId)
            .then((trails) => {
                trails.sort((a, b) => new Date(b.date) - new Date(a.date));
                this.setState({
                    trails: trails
                })
            })

    }

    render() {
        console.log("TRAIL LIST: Render");
        const { selectedOption } = this.state;

        return (
            <>

                <br></br>
                {/* //add this button above your display of trail cards */}
                <section className="section-content">
                    <Button variant="dark" size="lg"
                        type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/trails/new") }}
                        >Add New Trail

                    </Button>
                </section>

                <section className="sort-dropdown">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={options}
                    />
                </section>

                <div className="container-cards">

                    {this.state.trails.map(singleTrail =>
                        !singleTrail.archived ? (
                            <TrailCard
                                key={singleTrail.id}
                                trailProp={singleTrail}
                                {...this.props}
                            />

                        ) : (
                                null
                            )
                    )}

                </div>
            </>
        );
    }
}

export default TrailList