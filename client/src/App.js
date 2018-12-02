import React, { Component } from "react";
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
    title: "My fucking app",
    markdownSrc:
      "```\nNemanja\n```\n\n# H1\n## H2\n### H3\n#### h4\n##### h5\n###### h6\n\nparagraph\n\n- List\n- List\n- List\n"
  };
  onMarkdownChange = md => {
    this.setState({
      markdownSrc: md
    });
  };
  render() {
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
            <ReactMarkdown className="result" source={this.state.markdownSrc} />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default App;
