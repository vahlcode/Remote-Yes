import React, { Component } from 'react';

//Importing Components

import Header from "../Components/Header/Header";
import Jobs from "../Components/Jobs/Jobs";
import Drawer from "../Components/Drawer/Drawer";
import SignUp from "../Components/Sign Up/SignUp";
import Footer from "../Components/Footer/Footer";

class Index extends Component {
  constructor() {
    super();
    this.state = {
      draw: false,
      jobs: [],
      drawJob: []
    }
    this.Draw = this.Draw.bind(this)
    this.fetchJobs = this.fetchJobs.bind(this)
    this.searchJobs = this.searchJobs.bind(this)
    this.controller = new AbortController()
    this.signal = this.controller.signal
  }

  componentDidMount() {
    this.fetchJobs();

    const SEARCH_FORM = document.querySelector("#search-form")

    const CLEAR_FORM = document.querySelector("#clear-search")
    CLEAR_FORM.addEventListener("click", () => {
      SEARCH_FORM.value = ""
      this.fetchJobs()
    })

    const SEARCH_BUTTON = document.querySelector("#search-button")
    SEARCH_BUTTON.addEventListener("click", () => {
      if (SEARCH_FORM.value === "") {
        this.setState({...this.state, jobs: []})
        this.fetchJobs()
      } else {
        this.setState({...this.state, jobs: []})
        this.searchJobs(SEARCH_FORM.value)
      }
    })

    const CLOSE_DRAWER = document.querySelector(".close-drawer")
    CLOSE_DRAWER.addEventListener("click", () => {
      this.setState({draw: false})
    })
  }

  componentWillUnmount() {
    this.controller.abort()
  }

  Draw(e, id) {
    const TAGS_WHITELIST = ["button","svg","path","a"]
    if (TAGS_WHITELIST.indexOf(e.target.tagName.toLowerCase()) > -1) {
      return false;
    } else {
      const {jobs} = this.state;
      this.setState({drawJob: jobs["jobs"][id], draw: true})
    }
  }

  searchJobs(value) {
    const keyword = value.replace(/ /g, "%20").toLowerCase();
    const link = `https://shielded-sands-39483.herokuapp.com/https://remotive.io/api/remote-jobs?search=${keyword}`;
    const signal = this.signal

    fetch(link, {signal})
    .then(response => response.json())
    .then(jobs => { 
        this.setState({...this.state, jobs: jobs})
    })
    .catch(error => console.log(error))
  }

  fetchJobs() {
    const LINK = localStorage.getItem("link");
    if (localStorage.getItem("signed")) {
      const signal = this.signal
      
      fetch(`https://shielded-sands-39483.herokuapp.com/${LINK}&limit=150`, {signal})
      .then(response => response.json())
      .then(jobs => { 
          this.setState({...this.state, jobs: jobs})
      })
      .catch(error => console.log(error))
    }
  }

  render() {
    const {draw, jobs, drawJob} = this.state;
    return (
      <div className="App">
        <Header draw={draw} />
        <Jobs draw={draw} onClick={this.Draw} jobs={jobs}/>
        <Drawer job={drawJob} draw={draw}/>
        <SignUp />
        <Footer draw={draw}/>
      </div>
    )
  }
}

export default Index;
