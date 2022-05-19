import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Flying from "./Components/Flying";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Featured from "./Components/Featured";
import Projects from "./Components/Projects";
import { initializeParse } from '@parse/react';

initializeParse(
  process.env.REACT_APP_PARSE_HOST_URL,
  process.env.REACT_APP_PARSE_APPLICATION_ID,
  process.env.REACT_APP_PARSE_JAVASCRIPT_KEY
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
    };

    ReactGA.initialize('UA-000000-01');
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    const load = document.getElementById("siteLoading");
    $.ajax({
      url: "/resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
        setTimeout(() => {
          load.outerHTML = "";
        }, 500);
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />
        <Projects data={this.state.resumeData.portfolio} />
        //<Featured data={this.state.resumeData.features}/>
        <Flying data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;
