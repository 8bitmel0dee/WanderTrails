import React, { Component } from 'react'
//import the components we will need
import TrailCard from './TrailCard'
import TrailManager from '../../modules/TrailManager'
import Button from 'react-bootstrap/Button';



class TrailList extends Component {
    //define what this component needs to render
    state = {
        trailId: "",
        trails: [],
        loadingStatus: true
    };

    componentDidMount() {
        console.log("TRAIL LIST: ComponentDidMount");

        //userID variable created to only display the trails of the logged in user
        const userId = parseInt(sessionStorage.getItem("credentials"));

        console.log(userId);
        //getAll from TrailManager (with userId) and hang on to that data; put it in state
        TrailManager.getAll(userId)
            .then((trailsFromDatabase) => {
                trailsFromDatabase.sort((a, b) => new Date(b.rating) - new Date(a.rating));
                this.setState({
                    trails: trailsFromDatabase
                })
            })
    }

    render() {
        console.log("TRAIL LIST: Render");

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