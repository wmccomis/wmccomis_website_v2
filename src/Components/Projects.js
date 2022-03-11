import React, { Component } from 'react';

class Portfolio extends Component {
  render() {
    if (this.props.data){
      var project = this.props.data.projects.map(function(project){
        return <div key={project.title}>
          <figure className="github-project">
              <img src={project.image}/>
              <figcaption>
                {project.title3 == null ? <h2>{project.title1}<span>{project.title2}</span></h2> : <h2>{project.title1}<span>{project.title2}</span>{project.title3}</h2>}
                <p>{project.description1}</p>
                <p>{project.techstack}</p>
                <a href={project.url} target="blank"></a>
              </figcaption>     
          </figure>
          </div>
      })
    }

    return (
      <section id="projects">
        <div className="container-fluid projects">
            <div className="container-fluid projects">
                <div className="github_header">
                <img id="github_mark" src="/assets/images/github-logo.png"/>
                <img id="youtube_logo" src="/assets/images/youtube-logo.png"/>
                </div>
                <div className="grid">
                  {project}
                </div>
            </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
