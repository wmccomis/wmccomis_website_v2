import React, { Component } from 'react';

class Portfolio extends Component {
  render() {
    if (this.props.data){
      var features = this.props.data.articles.map(function(article){
        return <div key={article.title}>
          {/* <li> */}
            <a href={article.url} target="blank" className="profile">
              <h2 className="name">{article.title}</h2>
              <img src={article.image} />
            </a>
          {/* </li> */}
        </div>
      })
    }

    return (
      <section id="featured">
        <div id="featured_container">
          {/* <div className="blurred-box"> */}
            <div className="featured_header">
              <img id="featured_logo" src="/assets/images/breaking_news.jpg"/>
            </div>
            <div className="grid">
              {features}
            </div>
          {/* </div> */}
        </div>
      </section>
    );
  }
}

export default Portfolio;
