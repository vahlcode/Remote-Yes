import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import isInViewPort from "../../Assets/Js/isInViewPort";
import LogoLight from "../../Assets/logo-blue.svg";
import LogoDark from "../../Assets/logo-white.svg";
import Checkbox from "../Form/Checkbox";

import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchTheme: false,
            draw: props.draw,
            stick: false,
            categories: [],
            top: 0,
            showCategories: false
        }
        this.fetchCategories = this.fetchCategories.bind(this)
        this.switchTheme = this.switchTheme.bind(this)
        this.updateTheme = this.updateTheme.bind(this)
        this.showCategories = this.showCategories.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    componentDidMount() {
        this.updateTheme()
        this.fetchCategories()

        document.addEventListener("resize", () => this.setState({top: document.querySelector("header").offsetHeight}))

        const TOGGLE_MENU = document.querySelector(".toggle-menu")
        TOGGLE_MENU.addEventListener("click", () => this.showCategories())

        this.setState({top: document.querySelector("header").offsetHeight})

        window.addEventListener('scroll', () => {
            if (!isInViewPort(document.querySelector("#top"))) {
                this.setState({stick: true})
            } else {
                this.setState({stick: false})
            }
        })
    }

    componentWillReceiveProps(props) {
        this.setState({draw: props.draw})
        const SEARCH_LINK = document.querySelector("#search a")
        const SEARCH_FORM = document.querySelector(".search")

        SEARCH_LINK.addEventListener("click", (e) => {
            e.preventDefault()
            SEARCH_FORM.scrollIntoView(false)
        })
    }

    fetchCategories() {
        fetch("https://shielded-sands-39483.herokuapp.com/https://remotive.io/api/remote-jobs/categories")
        .then(response => response.json())
        .then(categories => this.setState({categories: categories["jobs"]}))
        .catch(error => console.log(error))
    }

    switchTheme(e) {
        const LOGO = document.querySelector('.branding img');
        const toggleSwitch = document.querySelector('#theme-switch');

        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            this.setState({...this.state, switchTheme: true});
            const {switchTheme} = this.state;
            toggleSwitch.checked = switchTheme;
            LOGO.src = LogoDark;
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            this.setState({...this.state, switchTheme: !this.state.switchTheme});
            const {switchTheme} = this.state;
            toggleSwitch.checked = switchTheme;
            LOGO.src = LogoLight;
        }  
    }

    updateTheme() {
        const LOGO = document.querySelector('.branding img');
        const currentTheme = localStorage.getItem('theme');
        const toggleSwitch = document.querySelector('#theme-switch');
    
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                this.setState({...this.state, switchTheme: true});
                const {switchTheme} = this.state;
                toggleSwitch.checked = switchTheme;
                LOGO.src = LogoDark;
            }
        }
    }

    showCategories() {
        this.setState({showCategories: !this.state.showCategories})
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
        window.location.reload()
    }

    render() {
        const {switchTheme, draw, stick, categories, top, showCategories} = this.state
        return(
            <Fragment>
                <header className={`${draw ? "draw" : ""}${stick ? " stick" : ""}`}>
                    <div className="row">
                        <div className="normal-header">
                            <div className="branding">
                            <Link to="/">
                                <img src={LogoLight} alt=""/>
                            </Link>
                            </div>
                            <nav className="menu">
                                <ul>
                                    <li id="search">
                                        <Link to="#search-form">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                            </svg>
                                            <span>Search</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/bookmarks">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span>Bookmarks</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <label htmlFor="theme-switch" className={`theme-btn ${(switchTheme) ? "active":""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`feather feather-moon ${(switchTheme) ? "active":""}`}>
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                            </svg>
                                            <input type="checkbox" id="theme-switch" onChange={this.switchTheme} checked={switchTheme}/>
                                        </label>
                                        <span>Switch Theme</span>
                                    </li>
                                    <li>
                                        <button className={`toggle-menu${showCategories ? " active" : ""}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                                                <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
                                                <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
                                            </svg>
                                            <span>Categories</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="drawer-header">
                            <button className="close-drawer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
                <section 
                    className={`category-lists${draw ? " draw" : ""}`} 
                    style={{top: top+2, height: `calc(100% - ${top}px)`, transform: showCategories ? "translateY(0)" : "translateY(-150%)"}}>
                    <h3>Select categories</h3>
                    <div className="categories">
                        {
                            categories.map((category, index) => <Checkbox key={index} value={category.slug} name="category" title={category.name} id={category.slug}/>)
                        }
                    </div>
                    <button className="set-categories" onClick={this.signUp}>
                        Find jobs
                    </button>
                </section>
            </Fragment>
        )
    }
}

export default Header;