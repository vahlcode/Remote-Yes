import React, { Component } from "react";

import "./Footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draw: props.draw
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            draw: props.draw
        })
    }

    render() {
        const {draw} = this.state;
        return(
            <footer className={`${draw ? " draw" : ""}`}>
                <div className="copyright">
                    <p>Made with love by <a href="https://twitter.com/vahlcode">Valentine Elum</a> with the <a href="http://https://remotive.io">Remotive API</a>. Icons by <a href="https://feathericons.com/">Feather Icons</a>.</p>
                </div>
            </footer>
        )
    }
}

export default Footer;