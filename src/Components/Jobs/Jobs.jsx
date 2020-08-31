import React, {Component} from 'react';

import "./Jobs.css";

import Card from "../Card/Card";

import Search from "../Form/Search";
import {Preloader} from "../Preloader/Preloader";

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: props.jobs,
            onClick: props.onClick,
            draw: props.draw
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            jobs: props.jobs,
            draw: props.draw
        })
    }

    render() {
        const {jobs, onClick, draw} = this.state;
        return(
            <section className={`list-section${draw ? " draw" : ""}`}>
                <div className="entry">
                    <h1>
                        Recent Jobs
                    </h1>
                </div>
                <Search />
                <div id="top"></div>
                <div className="jobs">
                    {
                        jobs["jobs"] && jobs["jobs"].map((job, index) => <Card job={job} key={index} onClick={(e) => onClick(e, index)}/>)
                    }
                </div>
                {
                    !jobs["jobs"] && <Preloader />
                }
            </section>
        )
    }
}

export default Jobs;