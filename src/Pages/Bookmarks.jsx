import React, { Component } from 'react';
import {Helmet} from "react-helmet";

//Importing Components

import Header from "../Components/Header/Header";
import Bookmark from "../Components/Bookmark/Bookmark";
import Drawer from "../Components/Drawer/Drawer";
import SignUp from "../Components/Sign Up/SignUp";
import Footer from "../Components/Footer/Footer";

class Bookmarks extends Component {
  constructor() {
    super()
    this.state = {
      draw: false,
      jobs: [],
      drawJob: [],
      noBookmarks: false
    }
    this.Draw = this.Draw.bind(this)
    this.fetchSavedJobs = this.fetchSavedJobs.bind(this)
    this.searchJobs = this.searchJobs.bind(this)
  }

  componentDidMount() {
    this.fetchSavedJobs()

    const CLOSE_DRAWER = document.querySelector(".close-drawer")
    CLOSE_DRAWER.addEventListener("click", () => {
      this.setState({ draw: false })
    })
  }

  Draw(e, id) {
    const TAGS_WHITELIST = ["button","svg","path","a"]
    if (TAGS_WHITELIST.indexOf(e.target.tagName.toLowerCase()) > -1) {
      return false
    } else {
      const { jobs } = this.state
      this.setState({ drawJob: jobs[id], draw: true })
    }
  }

  searchJobs(value) {
    const keyword = value.replace(/ /g, "%20").toLowerCase()
    const link = `https://shielded-sands-39483.herokuapp.com/https://remotive.io/api/remote-jobs?search=${keyword}`

    fetch(link)
      .then(response => response.json())
      .then(jobs => {
        this.setState({ ...this.state, jobs: jobs })
      })
      .catch(error => console.log(error))
  }

  fetchSavedJobs() {
    const SAVED = JSON.parse(localStorage.getItem("saved-jobs"))

    if (SAVED && SAVED.length !== 0) {
      fetch(`https://shielded-sands-39483.herokuapp.com/https://remotive.io/api/remote-jobs`)
      .then(response => response.json())
      .then(data => {
        // eslint-disable-next-line
        let { jobs, ...others } = data;
        let newJobs = jobs.filter(job => SAVED.indexOf(job.id.toString()) > -1)
        this.setState({ ...this.state, jobs: newJobs })
      })
      .catch(error => console.log(error))
    }else {
      this.setState({ ...this.state, jobs: null })
    }
  }

  render() {
    const { draw, jobs, drawJob, noBookmarks } = this.state
    return (
      <div className="Bookmarks">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Bookmarked Jobs - FromHome</title>
        </Helmet>
        <Header draw={draw} />
        <Bookmark draw={draw} onClick={this.Draw} jobs={jobs} noBookmarks={noBookmarks}/>
        <Drawer job={drawJob} draw={draw} />
        <SignUp />
        <Footer draw={draw}/>
      </div>
    )
  }
}

export default Bookmarks
