import React, {Component} from "react";

import "./CheckBox.css";

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            name: props.name,
            title: props.title,
            classes: props.classes,
            id: props.id,
            checked: false
        }
        this.check = this.check.bind(this);
    }

    check() {
        this.setState({checked: !this.state.checked})
    }

    render() {
        const {value, name, title, classes, id, checked} = this.state;
        return(
            <label htmlFor={id} className={`oma-ui check-box${checked ? " checked" : ""}`}>
                <div className={`indicator${checked ? " checked" : ""}`}></div>
                <span>{title}</span>
                <input type="checkbox" name={name} id={id} value={value} className={classes} onChange={this.check}/>
            </label>
        )
    }
}

export default CheckBox;