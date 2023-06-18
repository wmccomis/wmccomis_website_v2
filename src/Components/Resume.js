import React, { Component } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
// import { faDownload } from "@fortawesome/free-solid-svg-icons"



class Resume extends Component {
  render() {

    if (this.props.data){
      var name = this.props.data.name;
      var resumemessage = this.props.data.resumemessage;
      var email1 = this.props.data.contact.email1;
      var email2 = this.props.data.contact.email2;
      var degree = this.props.data.education.degree;
      var major = this.props.data.education.major;
      var dates = this.props.data.education.dates;
      var school = this.props.data.education.school;
      var gpa = this.props.data.education.gpa;
      var scholarship = this.props.data.education.scholarship;
      var interests = this.props.data.skills.interests;
      var technologies = this.props.data.skills.technologies;
      var languages = this.props.data.skills.languages;
      var work = this.props.data.work.map(function(work){
        return <div key={work.company}>
              <div className="resume-item">
                <div><h4>{work.company}</h4><em>{work.location}</em></div>
                <h5>{work.years}</h5>
                <p><em>{work.title}</em></p>
                <ul>
                  <li>{work.line1}</li>
                  <li>{work.line2}</li>
                  <li>{work.techstack}</li>
                </ul>
              </div>
                </div>
        });
        var lifeExperience = this.props.data.lifeExperience.map(function(life){
          return <div key={life.title}>
            <div className="resume-item">
              <h4>{life.title}</h4>
              <h5>{life.dates}</h5>
              <p><em>{life.location}</em></p>
              <ul>
                <li>{life.description1}</li>
                <li>{life.description2}</li>
              </ul>
            </div>
            </div>
        })
    }

    return (
      <section id="resume">
        <div className="resume-container">
        <div className="container">

        <div className="section-title">
          <h2>Resume</h2>
        </div>
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up">
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>{name}</h4>
              <p><em>{resumemessage}</em></p>
              <ul>
                <li><img src={"/assets/images/willmccomis2_email_white.png"} width="80"/>{email1}</li>
                {/* <li><img src={"/assets/images/wmccomis_email_white.png"} width="80"/>{email2}</li> */}
              </ul>
            </div>

            <h3 className="resume-title">Education</h3>
            <div className="resume-item">
              <h4>{degree} &bull; {major}</h4>
              <h5>{dates}</h5>
              <p><em>{school}</em></p>
              <ul>
                <li>{gpa}</li>
                <li>{scholarship}</li>
              </ul>            
            </div>
            <h3 className="resume-title">Skills</h3>
            <div className="resume-item">
            <p><em>Interests</em></p>
              <ul>
                <li>{interests}</li>
              </ul>
            <p><em>Languages/Libraries</em></p>
              <ul>
                <li>{languages}</li>
              </ul>    
            <p><em>Technologies</em></p>
              <ul>
                <li>{technologies}</li>
              </ul>         
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <h3 className="resume-title">Recent Professional Experience</h3>
            {work}
            <h3 className="resume-title">Recent Life Experience</h3>
            {lifeExperience}
          </div>
        </div>
        </div>
        <div className="container download">
            {/* <p>I am still working on finishing the Resume page layout</p>
            <p>For more information, you can download my resume or view my Linkedin</p> */}
            {/* <a href="https://docs.google.com/document/d/1iJZgXSP8s1uz6pHucjUMD-Xey6vLm4nWyNwfzU-ILjw/export?format=pdf" className="btn btn-dark downloadButton" target="_blank"><FontAwesomeIcon icon={faDownload} /> Download Resume</a>
            <a href="https://www.linkedin.com/in/william-mccomis-346301181/" className="btn btn-primary linkedinButton" target="_blank">Linked<FontAwesomeIcon icon={faLinkedin} /></a> */}
        </div>  
      </div>
    </section>
    );
  }
}

export default Resume;
