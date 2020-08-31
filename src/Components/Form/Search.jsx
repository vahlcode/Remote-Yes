import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
    render() {
        return(
            <section className="search">
                <input type="text" name="search" id="search-form" placeholder="Search for jobs" autoComplete="off"/>
                <div className="search-actions">
                    <button id="clear-search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <button id="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>
                
            </section>
        )
    }
}

export default Search;