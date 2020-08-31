import React, {Component} from "react";

import "./Drawer.css";

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draw: false,
            job: props.job
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({...this.state, job: props.job, draw: props.draw})
        
    }

    render() {
        const {draw, job} = this.state;
        const date = new Date(job.publication_date).toLocaleDateString('en-US', {  
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        })
        return(
                <div className={`drawer${draw? " draw" : ""}`}>
                <div className="body">
                    <div className="title-company">
                        <h1>{job.title && job.title}</h1>
                        <h3>
                            {job.company_name && job.company_name} 
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                {job.candidate_required_location && job.candidate_required_location}
                            </span>
                        </h3>
                    </div>
                    <div className="category-date-tags">
                        <div className="category-date">
                            {
                                job.category && 
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                    </svg>
                                    {job.category}
                                </span>
                            }
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {date && date}
                            </span>
                        </div>
                        <div className="tags">
                            <ul>
                                {
                                    job.tags && job.tags.map((tag, index) => <li key={index}>{tag}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: job.description && job.description.replace(/"&nbsp;"/g, "")}} />
                        <div className="link">
                            <a href={job.url && job.url} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Apply
                            </a>
                        </div> 
                    </div>
                </div>
        )
    }
}

export default Drawer;