import React, { Component } from "react";

import "./SignUp.css";

import JobsIllustration from "../../Assets/jobs.svg";
import Checkbox from "../Form/Checkbox";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: false,
            categories: []
        }
        this.fetchCategories = this.fetchCategories.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    
    componentDidMount() {
        if (!localStorage.getItem("signed")) {
            this.fetchCategories();
        } else {
            this.setState({hide: true})
        }

        const SIGN_UP_BUTTON = document.querySelector(".set-categories");

        SIGN_UP_BUTTON.addEventListener("click", this.signUp)
    }

    fetchCategories() {
        fetch("https://shielded-sands-39483.herokuapp.com/https://remotive.io/api/remote-jobs/categories")
        .then(response => response.json())
        .then(categories => this.setState({categories: categories["jobs"]}, () => console.log(this.state.categories)))
        .catch(error => console.log(error))
    }

    signUp() {
        const CATEGORIES = document.querySelectorAll("input[name='category']:checked");

        let VALUES = [];

        CATEGORIES.forEach(CATEGORY => {
            VALUES.push(CATEGORY.value);
        })

        const LINK = `https://remotive.io/api/remote-jobs?category=${VALUES}`

        localStorage.setItem("link", LINK)
        localStorage.setItem("signed", true)
        this.setState({hide: true})
    }

    render() {
        const {categories, hide} = this.state;
        return(
            <section className={`${hide ? " signed-up" : "sign-up"}`}>
                <div className="row">
                    <div className="image">
                        <img src={JobsIllustration} alt="Illustration of a male character with laptop and flowers around him."/>
                    </div>
                    <div className="text">
                        <h3>Select categories</h3>
                        <div className="categories">
                            {
                                categories.map((category, index) => <Checkbox key={index} value={category.slug} name="category" title={category.name} id={category.slug}/>)
                            }
                        </div>
                        <button className="set-categories">
                            Find jobs
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

export default SignUp;