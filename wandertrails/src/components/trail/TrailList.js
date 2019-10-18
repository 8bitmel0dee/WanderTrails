import React, { Component } from 'react'
//import the components we will need
import TrailCard from './TrailCard'
import TrailManager from '../../modules/TrailManager'

class TrailList extends Component {
    //define what this component needs to render
    state = {
        trails: [],
    };

    componentDidMount() {
        console.log("TRAIL LIST: ComponentDidMount");
        //getAll from TrailManager and hang on to that data; put it in state
        TrailManager.getAll()
            .then((trailsFromDatabase) => {
                this.setState({
                    trails: trailsFromDatabase
                })
            })
    }

    render() {
        console.log("TRAIL LIST: Render");

        return (
            <>
                {/* //add this button above your display of trail cards */}
                <section className="section-content">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/trails/new") }}
                        >Add New Trail

                    </button>
                </section>

                <div className="container-cards">

                    {this.state.trails.map(singleTrail =>
                        !singleTrail.archived ? (
                            <TrailCard
                                key={singleTrail.id}
                                trailProp={singleTrail}
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