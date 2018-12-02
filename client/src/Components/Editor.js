import React, { Component } from "react";
import CodeMirror from "@skidding/react-codemirror";

require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/xml/xml");
require("codemirror/mode/markdown/markdown");
require("codemirror/theme/material.css");

export default class Editor extends Component {
  updateCode = e => {
    this.props.onChange(e);
  };
  render() {
    const options = {
      mode: "markdown",
      theme: "material"
    };
    return (
      <CodeMirror
        value={this.props.value}
        options={options}
        height="100%"
        onChange={this.updateCode}
      />
    );
  }
}
