import React, {Component} from 'react';

import "../Jobs/Jobs.css";

import Card from "../Card/Card";

import {Preloader} from "../Preloader/Preloader";
import NotFound from "../Error/NotFound";

class Bookmark extends Component {
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
                        {(jobs !== null && jobs.length > 0) && jobs.length} Bookmarked Jobs
                    </h1>
                </div>
                <div id="top"></div>
                {
                    (jobs !== null && jobs.length === 0) && <Preloader /> 
                }
                {
                    (jobs !== null && jobs.length > 0) && <div className="jobs">{jobs.map((job, index) => <Card job={job} key={index} onClick={(e) => onClick(e, index)}/>)}</div>
                }
                {
                    jobs === null && <NotFound />
                }
            </section>
        )
    }
}

export default Bookmark;