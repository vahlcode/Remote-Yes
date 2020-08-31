import React, { Component } from "react";

import "./NotFound.css";

import NotFoundPic from "../../Assets/not-found.svg";

class NotFound extends Component {
    render() {
        return(
            <section className="not-found">
                <img src={NotFoundPic} alt="No content found."/>
                <h3>No Bookmarks</h3>
            </section>
        )
    }
}

export default NotFound;