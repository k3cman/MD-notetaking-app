import React, { Component, Fragment } from "react";
import "./App.css";
import {
  FaBeer,
  FaSave,
  FaList,
  FaFolderOpen,
  FaCloudUploadAlt
} from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import SplitPane from "react-split-pane";

import Editor from "./Components/Editor";

class App extends Component {
  state = {
    open: false,
    title: "",
    markdownSrc: "",
    list: []
  };
  onMarkdownChange = md => {
    this.setState({
      markdownSrc: md
    });
  };

  componentWillMount = () => {
    fetch("http://localhost:5000/all")
      .then(res => res.json())
      .then(data => this.setState({ list: data }));
  };

  onListClick = e => {
    fetch("http://localhost:5000/file/" + e)
      .then(res => res.json())
      .then(data =>
        this.setState({
          open: true,
          title: data.title,
          markdownSrc: data.body
        })
      );
  };
  render() {
    if (this.state.open) {
      return (
        <div className="App">
          <div className="nav">
            <div>
              <FaBeer color="#333" />
              <FaSave />
              <FaFolderOpen />
              <FaList />
            </div>
            <p>{this.state.title}</p>
            <FaCloudUploadAlt />
          </div>
          <SplitPane split="vertical" defaultSize="50%">
            <div className="editor-pane">
              <Editor
                className="editor"
                value={this.state.markdownSrc}
                onChange={this.onMarkdownChange}
              />
            </div>
            <div className="view-pane">
              <ReactMarkdown
                className="result"
                source={this.state.markdownSrc}
              />
            </div>
          </SplitPane>
        </div>
      );
    } else {
      return (
        <div className="openFile">
          {this.state.list.map((object, index) => (
            <div
              onClick={() => this.onListClick(object)}
              key={index}
              className="openSubFile"
            >
              <p>{object}</p>
              <FaFolderOpen />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default App;
