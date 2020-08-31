import React, { Component } from "react";

import "./Preloader.css";

export class Preloader extends Component {
    render() {
        return(
            <section className="preloader">
                <div className="loader"></div>
                <h5><span role="img" aria-label="A wait emoji">✋</span> Getting jobs...</h5>
            </section>
        )
    }
}

export class LoadingIcon extends Component {
    render() {
        return(
            <div className="loader"></div>
        )
    }
}