import React, {Component} from "react";

import "./Card.css";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: props.job,
            saved: "",
            draw: props.onClick
        }

        this.saveJob = this.saveJob.bind(this);
    }

    componentDidMount() {
        const ID = this.state.job.id;
        const saved = JSON.parse(localStorage.getItem("saved-jobs"));

        if (saved) {
            if (saved.includes(ID.toString())) {
                this.setState({...this.state, saved: true});
            }
        }
    }

    saveJob(id) {
        const ID = id.toString();
        
        if (localStorage.getItem("saved-jobs") === null) {
            let saved = [];

            saved.push(ID);

            this.setState({...this.state, saved: true});

            localStorage.setItem("saved-jobs", JSON.stringify(saved));

        } else if(!JSON.parse(localStorage.getItem("saved-jobs")).includes(ID)) {
            let saved = JSON.parse(localStorage.getItem("saved-jobs"));

            saved.push(ID);

            this.setState({...this.state, saved: true});

            localStorage.setItem("saved-jobs", JSON.stringify(saved));

        }   else if(JSON.parse(localStorage.getItem("saved-jobs")).includes(ID)) {
            let saved = JSON.parse(localStorage.getItem("saved-jobs"));

            let i = 0;

            while (i < saved.length) {
                if (saved[i] === ID) {
                    saved.splice(i, 1);
                } else if(saved[i] === null) {
                    saved.splice(i, 1);
                } else {
                    ++i;
                }
            }

            this.setState({...this.state, saved: false});
            
            localStorage.setItem("saved-jobs", JSON.stringify(saved));
        }
    }

    render() {
        const {job, saved, draw} = this.state;
        const date = new Date(job.publication_date).toLocaleDateString('en-US', {  
            day : 'numeric',
            month : 'short'
        })
        const category_slug = (category) => {
            let slug;
            if (category.indexOf("Development")) {
                slug =  category.replace("Development", "dev").replace(/[ ]/g, "-").replace(/[" / "]/g, "").toLowerCase()
            } else {
                slug =  category.replace(/[ "/"]/g, "-").replace(/([a-z])(?=\1)/i, "$1").toLowerCase()
                console.log("Pseww");
            }
            return slug;
        }

        return(
            <div className="card" data-id={job.id} onClick={draw}>
                <button className={`save-job${(saved) ? " saved" :""}`} data-id={job.id} onClick={() => this.saveJob(job.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
                <div className="row">
                    <div className="card-body">
                        <div className="card-title">
                            <h1>
                                {job.title}
                            </h1>
                        </div>
                        <div className="card-company">
                            {job.company_name} 
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>{date && date}
                            </span>
                        </div>
                        <div className="job-info">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                {job.candidate_required_location && job.candidate_required_location ? job.candidate_required_location : "Not specified"}
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book-open">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                {job.job_type && job.job_type.replace(/["_"]/g, " ").toUpperCase()}
                            </span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                                {job.salary && job.salary ? job.salary : "Not specified"}
                            </span>
                        </div>
                        <div className="card-category">
                            <a href={`/category/${category_slug(job.category)}`}>
                                {job.category}
                            </a>
                        </div>
                        <div className="card-tags">
                            <ul>
                                { job.tags.map((tag, index) => 
                                    {return (
                                        <li key={index}>
                                            <a href={`/tag/${tag.replace(/[ "/"]/g, "-").toLowerCase()}`}>
                                                <span>#</span>
                                                {tag}
                                            </a>
                                        </li>
                                        )}
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;